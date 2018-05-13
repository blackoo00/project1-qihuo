import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'

const Btns = ({...rest}) => {
    return (
        <div>
            <div styleName="trade-btn-wrap">
                <div styleName="trade-btn" onClick={rest.buy}>
                    <div styleName="btn-num">{rest.data.买价 ? rest.data.买价 : '...'}</div>
                    <div styleName="btn-title">买</div>
                </div>
                <div styleName="trade-btn" onClick={rest.ping_buy}>
                    <div styleName="btn-title-only">平买</div>
                </div>
                <div styleName="trade-btn" onClick={rest.sell}>
                    <div styleName="btn-num">{rest.data.卖价 ? rest.data.卖价 : '...'}</div>
                    <div styleName="btn-title">卖</div>
                </div>
                <div styleName="trade-btn" onClick={rest.ping_sell}>
                    <div styleName="btn-title-only">平卖</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    data:state.trade.data
})

const mapDispatchToProps = (dispatch,props) => ({
    buy:() => {
        dispatch({
            type:'trade/order',
            direction:0,
            offset:0
        })
    },
    sell:() => {
        dispatch({
            type:'trade/order',
            direction:1,
            offset:0
        })
    },
    ping_buy:() => {
        dispatch({
            type:'trade/ping',
            direction:0
        })
    },
    ping_sell:() => {
        dispatch({
            type:'trade/ping',
            direction:1
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Btns, styles))

