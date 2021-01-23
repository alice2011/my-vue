import {Login} from "@/api/login"
import {setToKen,setUserName,getUserName} from "@/utils/app"
import { removeToken, removeUserName } from "../../utils/app"

const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    count:10,
    to_ken:'',
    username:getUserName() || ''
}

const getters = {
    count: state => state.count + 10
}

const mutations = {//必须的 同步 没有回调处理事情
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse
        //html5本地存储
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_COUNT(state, value) {
        state.count = value
    },
    SET_TOKEN(state,value){
        state.to_ken = value
    },
    SET_USERNAME(state,value){
        state.username = value
    }
}

const actions = {//可以回调处理事情
    login(content,requestData){
        return new Promise((resolve,reject) => {
            Login(requestData).then(response => {
                let data = response.data.data
                content.commit('SET_TOKEN',data.token)
                content.commit('SET_USERNAME',data.username)
                setToKen(data.token)
                setUserName(data.username)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }){
        return new Promise((resolve,reject) => {
            removeToken();
            removeUserName();
            commit('SET_TOKEN','');
            commit('SET_USERNAME','');
            resolve();
        })
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
};