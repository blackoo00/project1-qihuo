import * as PersonalServices from '../services/personal'
import config from '../../../utils/config'
export default {
    namespace: 'personal',
    state: {
        data:[]
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname,query}) => {
                if(pathname === '/personal'){
                    dispatch({
                        type:'getUserInfo'
                    })
                }
            })
        },
    },

    effects: {
       *getUserInfo({},{call,put}){
           const {data} = yield call(PersonalServices.getUserInfo,{});
           if(data){
               if(data.账号){
                   sessionStorage.setItem(config.ACCOUNT,data.账号)
               }
               yield put({
                   type:'assignData',
                   data:data
               })
           }
       }
    },

    reducers: {
        assignData(state,{data}){
            return {
                ...state,
                data:data
            }
        }
    },

};
