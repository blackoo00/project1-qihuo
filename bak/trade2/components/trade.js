import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import Kmap from './Kmap'
import Operation from './operation'
import Pirce from './price'
import Btns from './btns'
import Header from './header'
import React from 'react'
import {connect} from 'dva'
import {Toast} from 'antd-mobile'

let id = 0;

const Trade = () => (
    <div>
        <Header/>
        <Kmap/>
        <Operation/>
        <Pirce/>
        <Btns/>
    </div>
)

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

