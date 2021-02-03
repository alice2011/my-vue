<template>
    <div id="main-wrap">
        <div class="main-content">
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import {ref,reactive} from '@vue/composition-api'
export default {
    setup(props,{ root }){
        // const bbb = root.$store.state.login.aaa

        // const json = reactive({
        //     "name":"vue学习",
        //     "title":"aaa"
        // });

        // const toString = ref(JSON.stringify(json))
        // console.log(toString.value)

        // return {
        //     bbb
        // }

    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap{
    height:100vh;
    background:#f7f7f7;
    // position: fixed;
    // left:250px;
    // top:75px;
    // right:0;
    // bottom:0;
    // border:30px solid #f7f7f7;
    // border-bottom: none;
    // -webkit-box-sizing:border;
}
.main-content{
    width:100%;
    height:100%;
    padding-right:30px;
    padding-top:$layoutHeader + 30;
    padding-left:$navMenu + 30;
    -webkit-box-sizing:border-box;
    box-sizing: border-box;
}
.open {
   .main-content{
       padding-left:$navMenu + 30;
   } 
}
.close {
   .main-content{
       padding-left:$navMenuMin + 30;
   } 
}
.content{
    width:100%;
    height:100%;
    padding-top:30px;
    padding-left:30px;
    -webkit-box-sizing:border-box;
    box-sizing: border-box;
    background:#fff;
}
</style>