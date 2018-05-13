import CSSModules from 'react-css-modules'
import styles from '../styles/trade.css'
import React from 'react'
import {Toast} from 'antd-mobile'
import Btns from './btns'

let id = 0

class Price extends React.Component{
    constructor(){
        super()
    }
    state = {
        data:{
            买价:0,
            买量:0,
            卖价:0,
            卖量:0,
            最新价:0,
            合约别名:''
        },
        list:[]
    }
    componentWillMount() {
        Toast.loading('加载中...', 1000);
    }

    componentDidMount() {
        id = setInterval(() => {
            if (typeof window.home_data != 'undefined') {
                Toast.hide();
                this.assignData(window.home_data);
                this.assignList(window.home_data);
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(id);
    }
    assignData(resource){
        const code =sessionStorage.getItem('trade_code');
        const list = JSON.parse(resource);
        const data = list.filter(item => item.合约 === code)[0];
        this.setState({
            data:data
        })
    }
    assignList(data){
        this.setState({
            list:JSON.parse(data)
        })
    }
    render(){
        const {data,list} = this.state;
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
            <Btns data={data}/>
        </div>
        )
    }
}

export default CSSModules(Price, styles)

