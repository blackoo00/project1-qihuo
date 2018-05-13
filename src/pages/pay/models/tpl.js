export default {
    namespace: 'pay',
    state: {
        type:'alipay',
        headerText:'支付宝转账',
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/pay'){
                    dispatch({
                        type:'assignType',
                        way:query.type
                    })
                }
            })
        },
    },

    effects: {

    },

    reducers: {
        assignType(state,{way}){
            let text = '';
            if(way === 'alipay'){
                text = '支付宝转账'
            }
            if(way === 'payunion'){
                text = '银行转账'
            }
            return{
                ...state,
                type:way,
                headerText:text
            }
        }
    },

};
