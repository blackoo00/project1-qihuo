import config from '../../../utils/config'
import * as TradeServices from '../services/trade'
import {Modal,Toast} from 'antd-mobile'
const prompt = Modal.prompt;

export default {
    namespace: 'trade',
    state: {
        price_type: 1,
        data: [],
        num: 1,
        list: [],
        code:'',
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/trade') {
                    dispatch({
                        type:'getList'
                    })
                    dispatch({
                        type:'assignCode',
                        code:query.code
                    })
                    // const work = window.$.connection.myHub;
                    // window.$.connection.hub.url = 'http://139.196.236.139:1818/lcc';
                    // window.$.connection.hub.start().done(function () {
                    //     setInterval(function () {
                    //         work.server.单品种行情(query.code);
                    //     }, 1000)
                    // });
                    // work.client.danhangqin = function (data) {
                    //     console.log(data);
                    //     // dispatch({
                    //     //     type: 'assignData',
                    //     //     data: JSON.parse(data)
                    //     // })
                    // };
                }
            })
        },
    },

    effects: {
        * order({direction,offset},{call,select}){
            const price_type = yield select(state => state.trade.price_type);
            console.log(price_type);
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
                console.log(data);
                if(data.信息 === 'error'){
                    Toast.info('交易失败');
                }else{
                    Toast.info(data.信息)
                }
            }
            if(price_type === 2){
                prompt('买', '当前限价:100(需低于限价)',
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
            const offset = data.今仓 ? 1 : 3;
            yield put({
                type:'order',
                direction:direction,
                offset:offset
            })
        },
        //顶部下拉列表
        * getList({}, {put,select}) {
            const list = yield select(state => state.home.list);
            if(list.length != 0){
                yield put({
                    type:'assignList',
                    data:list
                })
            }else{
                const data = sessionStorage.getItem(config.K_DATA_LIST);
                if(data){
                    yield put({
                        type:'assignList',
                        data:JSON.parse(data)
                    })
                }
            }
        },
        *getData({},{put,select}){
            const code = yield select(state => state.trade.code);
            const data_list = JSON.parse(sessionStorage.getItem(config.K_DATA_LIST));
            const data = data_list.filter(item => item.合约 === code)[0];
            yield put({
                type:'assignData',
                data:data
            })
        }
    },

    reducers: {
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
        assignData(state, {data}) {
            return {
                ...state,
                data: {...data}
            }
        }
    },

};
