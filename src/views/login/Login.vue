<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggle(item)">{{ item.txt }}</li>
            </ul>
            <!-- 表单 开始 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login-form">
                
                <el-form-item prop="username" class="item-form">
                    <label for="">邮箱</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off" size="small"></el-input>
                </el-form-item>

                <el-form-item prop="password" class="item-form">
                    <label for="">密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" size="small" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="passwords" class="item-form" v-show="model==='register'">
                    <label for="">确认密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" size="small" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code" class="item-form">
                    <label for="">验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15"><el-input v-model.number="ruleForm.code" size="small" minlength="6" maxlength="6"></el-input></el-col>
                        <el-col :span="9"><el-button type="success" class="block" size="small">验证码</el-button></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
            <!-- 表单 结束 -->
        </div>
    </div>
</template>
<script>
import { stripscript,validateEmail,validatePass,validateCode } from '@/utils/validate.js'
export default{
    name:'login',
    data(){
        //表单数据
        
        //验证用户名
        var validateUsername = (rule, value, callback) => {
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
        var validatePassword = (rule, value, callback) => {
            //过滤后的数据
            this.ruleForm.password = stripscript(value)
            value = this.ruleForm.password

            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (validatePass(value)) {
            callback(new Error('密码格式不正确'));
            } else {
            callback();
            }
        };
        //验证重复密码
        var validatePasswords = (rule, value, callback) => {
            //如果模块值为login就直接跳过
            if(this.model==='login') { callback(); }
            //过滤后的数据
            this.ruleForm.passwords = stripscript(value)
            value = this.ruleForm.passwords

            if (value === '') {
            callback(new Error('请输入密码'));
            } else if (value != this.ruleForm.password) {
            callback(new Error('重复密码不正确'));
            } else {
            callback();
            }
        };
        //验证验证码
        var checkCode = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入验证码'));
            } else if (validateCode(value)) {
            callback(new Error('验证码格式不正确'));
            } else {
            callback();
            }
        };

        return{
            menuTab:[
                {txt:'登录',current:true,type:'login'},
                {txt:'注册',current:false,type:'register'}
            ],
            //模块值
            model:'login',
            //表单数据
            ruleForm: {
                username: '',
                password: '',
                passwords: '',
                code: ''
                },
            rules: {
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
            }
         };
    },
    //创建完成后执行
    created(){},
    //挂载完成后执行
    mounted(){},
    //定义函数
    methods:{
        toggle(data){
            this.menuTab.forEach((elem,index) => {
                elem.current = false
            });

            //选中高亮
            data.current = true
            //修改模块值
            this.model=data.type

        },
        // 表单函数
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
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