const app = {
    state: {
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
        count: 10
    },
    getters: {
        count: state => state.count + 10
    },
    mutations: {//必须的 同步 没有回调处理事情
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse
            //html5本地存储
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        },
        SET_COUNT(state, value) {
            state.count = value
            console.log(state.count)
        }
    },
    actions: {//可以回调处理事情
        login(content, requestData) {
            return new Promise((resolve, reject) => {
                //接口
                Login(requestData).then((response) => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default app;