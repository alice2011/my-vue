<template>
    <div id="nav-wrap" class="close">
        <h1 class="logo"><img src="../../../assets/logo2.png" alt=""></h1>
        <el-menu 
         default-active="1-4-1" 
         class="el-menu-vertical-demo"  
         :collapse="isCollapse" 
         background-color="transparent" 
         text-color="#fff" 
         router>       
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <!-- 一级菜单 -->
                    <template slot="title">
                    <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                    <span slot="title">{{ item.meta.name }}</span>
                    </template>
                    <!-- 子菜单 -->
                    <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
                </el-submenu>
            </template>

        </el-menu>
    </div>
</template>
<script>
import { reactive,ref,isRef,toRefs,onMounted,computed } from '@vue/composition-api';

export default {
    name:'navMenu',
    setup(props,{ root }){
        /**
         * 数据
         */
        // const isCollapse = ref(false);
        const routers = reactive(root.$router.options.routes);

        /**
         * computed 监听
         */
        const isCollapse = computed(() => root.$store.state.app.isCollapse) 

        //打印store
        // console.log(root.$store.state.app.count)
        // console.log(root.$store.app.getters.count)
        // root.$store.app.commit('SET_COUNT',100)

        return {
            isCollapse,
            routers
        }
    }
}
</script>
<style lang="scss" scoped>
.logo{
    margin:0;
    text-align: center;
    img{
        @include webkit(transition,all .3s ease 0s)
    }
}
#nav-wrap{
    position:fixed;
    top:0;
    left:0;
    width:250px;
    height:100vh;
    background-color: #344a5f;
    @include webkit(transition,all .3s ease 0s);
    svg{
        font-size:25px;
        margin-right:10px;
    }
}
.open {
    #nav-wrap{
        width:$navMenu;
    }
}
.close {
    #nav-wrap{
        width:64px;
    }
    .logo img{
        width:70%;
    }
}
</style>