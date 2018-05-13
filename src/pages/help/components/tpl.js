import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {List,WhiteSpace} from 'antd-mobile'
import router from 'umi/router'
import icon from '../images/icon-tel.png'
import {removeScrollListener, scrollLoadMore} from "../../../utils/common";
import React from 'react'
import config from '../../../utils/config'
const Item = List.Item

class Help extends React.Component{
    componentDidMount(){
        let {loadMore} = this.props;
        scrollLoadMore(() => {
            loadMore()
        })
    }
    componentWillUnmount(){
        removeScrollListener()
    }
    render(){
        const {...rest}  = this.props;
        return(
            <div>
                <Header
                    title={'客服中心'}
                    leftCallBack={() => {router.goBack()}}
                    rightText={<a href={"tel:"+config.SERVICE_TEL}><img alt={""} style={{width:'.2rem'}} src={icon}/></a>}
                />
                <WhiteSpace size={"md"}/>
                <List
                    // renderHeader={'注册问题'}
                >
                    {rest.list.map(item => (
                        <Item
                            key={item.id}
                            arrow={'horizontal'}
                            onClick={
                                () => {
                                    sessionStorage.setItem('help_title',item.标题)
                                    sessionStorage.setItem('help_content',item.内容)
                                    router.push({pathname:'/helpDetail'})
                                }
                            }
                        >
                            <span style={{fontSize:'14px'}}>{item.标题}</span>
                        </Item>
                    ))}
                </List>
                <div styleName="wrap-footer">
                    <a>没有解决问题？点此提问</a>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list:state.help.list
})

const mapDispatchToProps = (dispatch,props) => ({
    loadMore:() => {
        dispatch({
            type:'discover/loadMore'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(Help, styles))

