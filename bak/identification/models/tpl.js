import * as IdentifyServices from '../services/tpl'
import {Toast} from 'antd-mobile'
import router from 'umi/router'
export default {
    namespace: 'identification',
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
        *submit({values},{call,put}){
            const {data} = yield call(IdentifyServices.submit,values);
            Toast.info(data.信息)
            if(data.状态){
                router.push({pathname:'/myInfo'})
            }
        }
    },

    reducers: {

    },

};
