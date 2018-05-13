import * as LoginServices from '../services/login'
import {Toast} from 'antd-mobile'
import router from 'umi/router'
import config from '../../../utils/config'

export default {
    namespace: 'login',
    state: {
        sev:0
    },
    subscriptions: {
        setup({ dispatch, history }) {
        },
    },

    effects: {
        *LoginIn({values},{call}){
            const {data} = yield call(LoginServices.Login,values);
            Toast.info(data.信息,1);
            if(data.状态){
                sessionStorage.setItem(config.KEY,data.key);
                sessionStorage.setItem(config.PASSWORD,values.password);
                router.push('/personal');
            }
        }
    },

    reducers: {
        assignSev(state,{sev}){
            return{
                ...state,
                sev:sev
            }
        }
    },

};
