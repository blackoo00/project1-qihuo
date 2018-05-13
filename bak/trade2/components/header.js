import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {Picker} from 'antd-mobile'
import router from 'umi/router'

const TradeHeader = ({data,list}) => {
    return (
        <div>
            <Header
                title={<Picker data={list} cols={1}>
                    <div>{data.合约别名}</div>
                </Picker>}
                callBack={() => {router.push({pathname:'/trade',query:{code:data.合约}})}}
                rightText={'规则'}
                rightCallBack={() => {router.push({pathname:'/tradeRule'})}}
                leftCallBack={() =>{router.push({pathname:'/'})}}
            />
        </div>
    );
};

const mapStateToProps = state => ({
    data:state.trade.data,
    list:state.trade.list
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(TradeHeader, styles))

