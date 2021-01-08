<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{ item.txt }}</li>
            </ul>
            <!-- 表单 开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form">
                
                <el-form-item prop="username" class="item-form">
                    <label for="">邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label for="">密码</label>
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off" size="small" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-show="model==='register'">
                    <label for="">确认密码</label>
                    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" size="small" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label for="">验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15"><el-input v-model.number="ruleForm.code" size="small" minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="9"><el-button type="success" class="block" size="small" @click="getSms()" :disabled="codeBtnStatus.status">{{ codeBtnStatus.text }}</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled="loginBtnStatus">{{model === 'login' ? '登录' : '注册' }}</el-button>
                </el-form-item>
            </el-form>
            <!-- 表单 结束 -->
        </div>
    </div>
</template>
<script>
import { Message } from 'element-ui'
import { GetSms,Login,Register } from '@/api/login'

import {isRef, onMounted, reactive,ref, toRefs} from '@vue/composition-api'
import { stripscript,validateEmail,validatePass,validateCode } from '@/utils/validate'
export default{
    name:'login',
    setup(props,context){
        //验证用户名
        let validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if(validateEmail(value)){
                callback(new Error('用户名格式不正确'));
            }
            else{
                callback();
            }
        };
        //验证密码
        let validatePassword = (rule, value, callback) => {
            //过滤后的数据
            ruleForm.password = stripscript(value)
            value = ruleForm.password

            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (validatePass(value)) {
            callback(new Error('密码格式不正确'));
            } else {
            callback();
            }
        };
        //验证重复密码
        let validatePasswords = (rule, value, callback) => {``
            //如果模块值为login就直接跳过
            if(model.value==='login') { callback(); }
            //过滤后的数据
            ruleForm.passwords = stripscript(value)
            value = ruleForm.passwords

            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (value != ruleForm.password) {
            callback(new Error('重复密码不正确'));
            } else {
            callback();
            }
        };
        //验证验证码
        let checkCode = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入验证码'));
            } else if (validateCode(value)) {
            callback(new Error('验证码格式不正确'));
            } else {
            callback();
            }
        };

        /*************************************************************************************
         * 声明数据
         */
        //这里放置data数据、生命周期
        const menuTab=reactive([
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ])
        //模块值    
        const model = ref('login')
        //登录按钮状态
        const loginBtnStatus = ref(true)
        //验证码按钮状态
        const codeBtnStatus = reactive(
            {
                status:false,
                text:'获取验证码'
            }
        )
        //计时器
        const timer = ref(null);

        //表单数据
        const ruleForm=reactive( {
            username: '',
            password: '',
            passwords: '',
            code: ''
        })  
        //表单验证
        const rules=reactive( {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
            })

        /***********************************************************************************************
         * 声明函数
         */
        const toggleMenu = (data => {
            menuTab.forEach((elem,index) => {
                elem.current = false
            });
            //选中高亮
            data.current = true
            //修改模块值
            model.value=data.type
            //重置表单
            resetFromData()
            clearCountDown()
        })
        //清除表单数据
        const resetFromData = (() => {
            context.refs['ruleForm'].resetFields();
        })

        //更新按钮状态
        const updataButtonStatus = ((params) => {
            codeBtnStatus.status = params.status;
            codeBtnStatus.text=params.text;
        })

        //获取验证码
        const getSms = (() => {
            //进行提示
            if(ruleForm.username == ''){
                context.root.$message.error('邮箱不能为空');
                return false
            }
            if(validateEmail(ruleForm.username)){
                context.root.$message.error('邮箱格式有误，请重新输入！');
                return false
            }
            //获取验证码
            let requestData = {
                username:ruleForm.username,
                model:model.value
            }

            //修改获取验证码按钮状态
            updataButtonStatus({
                status:true,
                text:'发送中'
            })

            setTimeout(() => {
                GetSms(requestData).then(response => {
                    let data = response.data
                    context.root.$message({
                        message:data.message,
                        type:'success'
                    })
                    //启用登录或注册按钮
                    loginBtnStatus.value = false
                    //调定时器，倒计时
                    countDown(5)


                }).catch(error => {
                    console.log(error)
                })
            }, 3000);

            
            // GetSms({ username:ruleForm.username })
        })

        //提交表单
        const submitForm = (formName => {
            context.refs[formName].validate((valid) => {
            //表单验证通过
            if (valid) {
                //三元运算
                model.value === 'login' ? login() : register();
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        })

        /**
         * 登录
         */
        const login=(() => {
            let requestData = {
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code
            }
            Login(requestData).then(response => {
                console.log('登录成功')
                console.log(response)
                //页面跳转
                context.root.$router.push({
                    name:'Console'
                })
            }).catch(error => {
                
            })
        })

        /**
         * 注册
         */
        const register = (() => {
            let requestData = {
                username:ruleForm.username,
                password:ruleForm.password,
                code:ruleForm.code,
                model:'register'
            }
            Register(requestData).then(response =>{
                let data = response.data
                context.root.$message({
                    message:data.message,
                    type:'success'
                })
                //模拟注册成功
                toggleMenu(menuTab[0]);
                clearCountDown();
            }).catch(error => {

            })
        })

        /**
         * 倒计时
         */
        const countDown = ((number) => {
            let time = number
            timer.value = setInterval(() => {
                time--
                if(time === 0){
                    clearInterval(timer.value)
                    //修改获取验证码按钮状态
                    updataButtonStatus({
                        status:false,
                        text:'再次获取'
                    })
                } else{
                    codeBtnStatus.text=`倒计时${time}秒` //es6写法
                }
                
                console.log(time)
            },1000)
        })

        /**
         * 清除倒计时
         */
        const clearCountDown = (() => {
            //还原验证码按钮默认状态
            updataButtonStatus({
                status:false,
                text:'获取验证码'
            })
            //清除倒计时
            clearInterval(timer.value);
        })

        /**
         * 生命周期
         */
        //挂载完成后
        onMounted(()=>{
            
        })

        return {
            menuTab,
            model,
            loginBtnStatus,
            codeBtnStatus,
            ruleForm,
            rules,
            toggleMenu,
            submitForm,
            getSms
        }

        
    },

}
</script>
<style lang="scss" scoped>
#login{
    background-color: darkcyan;
    height:100vh;
}
.login-wrap{
    width:330px;
    margin:auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width:88px;
        line-height:36px;
        font-size:14px;
        color:#fff;
        border-radius:2px;
        cursor: pointer;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    margin-top:30px;
    label{
        display: block;
        margin-bottom:3px;
        font-size:14px;
        color:#fff;
    }
    .block{
        display: block;
        width:100%;
    }
    .item-form{
        margin-bottom: 3px;;
    }  
    .login-btn{
        margin-top:19px;
    }
}
</style>