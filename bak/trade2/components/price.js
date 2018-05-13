import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import {connect} from 'dva'
import React from 'react'
import {Toast} from 'antd-mobile'
import config from "../../../utils/config";

let id = 0

class Price extends React.Component{
    componentWillMount() {
        const {data} = this.props;
        if (data.length === 0) {
            Toast.loading('加载中...', 1000);
        }
    }

    componentDidMount() {
        const {assignList, getData} = this.props;
        id = setInterval(() => {
            if (typeof window.home_data != 'undefined') {
                Toast.hide();
                getData();
                // assignList(JSON.parse(window.home_data))
                sessionStorage.setItem(config.K_DATA_LIST, window.home_data);
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(id);
    }
    render(){
        const {data} = this.props;
        return(
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
        )
    }
}
// const Price = ({data}) => {
//     return (
//
//     );
// };

const mapStateToProps = state => ({
    data:state.trade.data
})

const mapDispatchToProps = (dispatch,props) => ({
    getData: () => {
        dispatch({
            type: 'trade/getData'
        })
    },
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Price, styles))

