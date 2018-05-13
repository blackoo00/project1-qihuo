export default {
    namespace: 'helpDetail',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/'){

                }
            })
        },
    },

    effects: {

    },

    reducers: {

    },

};
