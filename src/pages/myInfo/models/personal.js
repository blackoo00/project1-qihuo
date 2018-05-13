
export default {
    namespace: 'myInfo',
    state: {
        data:{}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/myInfo'){
                    dispatch({
                        type:'checkData'
                    })
                }
            })
        },
    },

    effects: {
       *checkData({},{call,put,select}){
           const data = yield select(state => state.personal.data);
           if(data.length === 0){
               yield put({
                   type:'personal/getUserInfo'
               })
           }
       }
    },

    reducers: {

    },

};
