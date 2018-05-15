import config from '../../../utils/config'
import * as TradeServices from '../services/trade'
import {Modal,Toast} from 'antd-mobile'
const prompt = Modal.prompt;

export default {
    namespace: 'trade',
    state: {
        price_type: 1,
        num: 1,
        list: [],
        code:'',
        code_name:'',
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/trade' && sessionStorage.getItem(config.KEY)) {
                    dispatch({
                        type:'assignCode',
                        code:query.code
                    })
                    dispatch({
                        type:'getList'
                    })
                    sessionStorage.setItem('trade_code',query.code);
                }
            })
        },
    },

    effects: {
        * order({direction,offset},{call,put,select}){
            const price_type = yield select(state => state.trade.price_type);
            if(price_type === 1){
                const code = yield select(state => state.trade.code);
                const num = yield select(state => state.trade.num);
                const post_data = {
                    instrument:code,
                    direction:direction,
                    volume:num,
                    offset:offset
                }
                const {data} = yield call(TradeServices.order,post_data);
                if(data){
                    if(data.信息 === 'error'){
                        window.alert('交易失败')
                        // text = '交易失败';
                        // Toast.info('交易失败');
                    }else{
                        window.alert(data.信息)
                        // Toast.info(data.信息)
                    }
                }
            }
            if(price_type === 2){
                let title = direction === 0 ? "买" : "卖";
                if(offset != 0 ){
                    title = title === "买" ? "平卖" : "平买";
                }
                prompt(title, '',
                    [
                        {
                            text: '取消',
                            onPress: value => new Promise((resolve) => {
                                resolve();
                                console.log(`value:${value}`);
                            }),
                        },
                        {
                            text: '确定',
                            onPress: value => new Promise((resolve, reject) => {
                                reject();
                                console.log(`value:${value}`);
                            }),
                        },
                    ], 'default', null, ['请输入价格']);
            }
        },
        * ping({direction},{put,call,select}){
            const code = yield select(state => state.trade.code);
            const {data} = yield call(TradeServices.getOffect,{pz:code,fx:direction});
            if(data.数量 === 0){
                window.alert('还未持仓');
            }else{
                const offset = data.昨仓 ? 1 : 3;
                yield put({
                    type:'order',
                    direction:direction === 0 ? 1 : 0,
                    offset:offset
                })
            }
        },
        //顶部下拉列表
        * getList({}, {put,select}) {
            let list = yield select(state => state.home.list);
            const code = yield select(state => state.trade.code);
            if(list.length == 0){
                list = JSON.parse(sessionStorage.getItem(config.K_DATA_LIST));
            }
            const code_name = list.filter(item => item.合约 === code)[0]['合约别名'];
            yield put({
                type:'assignList',
                data:list
            })
            yield put({
                type:'assignCodeName',
                name:code_name
            })
        },
    },

    reducers: {
        assignCodeName(state,{name}){
          return {
              ...state,
              code_name:name
          }
        },
        assignNum(state,{num}){
            num = num <= 1 ?  1 : num;
            return {
                ...state,
                num:num
            }
        },
        assignCode(state,{code}){
          return {
              ...state,
              code:code
          }
        },
        assignList(state,{data}){
            data.map(item => {
                item['label'] = item.合约别名
                item['value'] = item.合约
            });
          return {
              ...state,
              list:data
          }
        },
        assignPriceType(state, {value}) {
            return {
                ...state,
                price_type: value
            }
        },
    },

};
