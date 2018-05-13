import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'

const Price = ({data}) => {
    return (
        <div>
            <div styleName="price-detail">
                <div styleName="detail-left">
                    <div styleName="detail-left-top">
                        <div styleName="detail-left-item">买价：{data.买价}</div>
                        <div styleName="detail-left-item">买量：{data.买量}</div>
                    </div>
                    <div styleName="detail-left-top">
                        <div styleName="detail-left-item">卖价：{data.卖价}</div>
                        <div styleName="detail-left-item">卖量：{data.卖量}</div>
                    </div>
                </div>
                <div styleName="detail-right">
                    <div styleName="detail-right-item">{data.最新价}</div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    data:state.trade.data
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Price, styles))

