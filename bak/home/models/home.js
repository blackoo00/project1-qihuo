export default {
    namespace: 'home',
    state: {
        list:[]
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                // if(pathname === '/'){
                //     window.hub.start().done(function () {
                //         setInterval(function () {
                //             window.work.server.品种行情();
                //         }, 1000)
                //     });
                //     window.work.client.GetFSData = function (data) {
                //         console.log(data)
                //         dispatch({
                //             type:'assignList',
                //             data:JSON.parse(data)
                //         })
                //         sessionStorage.setItem(config.K_DATA_LIST,data);
                //     };
                // }
            })
        },
    },

    effects: {
        //监听trade页面
        *assignList({data},{call,put,select}){
            const code = yield select(state => state.trade.code);
            if(code){
                const item = data.filter(item => item.合约 === code)[0];
                // console.log(item);
                yield put({
                    type:'trade/assignData',
                    data:item
                })
            }
        }
    },

    reducers: {
        assignList(state,{data}){
            return {
                ...state,
                list:data
            }
        }
    },

};
