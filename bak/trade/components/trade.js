import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import Kmap from './Kmap'
import Operation from './operation'
import Pirce from './price'
import Btns from './btns'
import Header from './header'
import React from 'react'
import {connect} from 'dva'
import config from "../../../utils/config";
import {Toast} from 'antd-mobile'

let id = 0;

class Trade extends React.Component {
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

    render() {
        return (
            <div>
                <Header/>
                <Kmap/>
                <Operation/>
                <Pirce/>
                <Btns/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.trade.data
})

const mapDispatchToProps = (dispatch, props) => ({
    getData: () => {
        dispatch({
            type: 'trade/getData'
        })
    },
    assignList: (data) => {
        dispatch({
            type: 'home/assignList',
            data: data
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Trade, styles))

