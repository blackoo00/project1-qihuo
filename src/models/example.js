import config from "../utils/config";
import router from 'umi/router'
import * as CommonServies from '../services/example'
import {Toast} from 'antd-mobile'

export default {
  namespace: 'example',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
        return history.listen(({pathname,query}) => {
            const key = sessionStorage.getItem(config.KEY);
            if(pathname !== '/'&& pathname !== '/register' && pathname !== '/login'){
                if(!key){
                    router.push('/login')
                }else{
                    dispatch({
                        type:'checkKey',
                        key:key
                    })
                }
            }
        })
    },
  },

  effects: {
    *checkKey({key},{call}){
        const {data} = yield call(CommonServies.checkKey,{key:key});
        if(!data.状态){
            Toast.info('账号异常，请重新登录',2);
            router.push('/login')
        }
    }
  },

  reducers: {

  },

};
