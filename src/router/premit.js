import router from "./index";
import store from "../store/index"
import { getToKen,removeToken,removeUserName } from "@/utils/app"

const whiteRouter = ['/login'];

// 路由守卫
router.beforeEach((to, from, next) => {
    if(getToKen()){
        if(to.path === '/login'){
            removeToken();
            removeUserName();
            store.commit("app/SET_TOKEN","");
            store.commit("app/SET_USERNAME","");
        }
        console.log('存在');
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            next()
        }else{
            next('/login')
        }
    }
    console.log(to)  // 进入的页面（下一个页面）
    console.log(from)// 离开之前的页面（上一个）
    console.log(next)
    next() //to
})