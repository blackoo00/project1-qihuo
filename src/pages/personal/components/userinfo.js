import CSSModules from 'react-css-modules'
import styles from '../styles/personal.css'
import {connect} from 'dva'
import router from 'umi/router'

const UserInfo = ({...rest}) => {
    return (
        <div styleName="mod-userinfo">
            <div styleName="balance-wrap">
                <p>账户余额</p>
                <p style={{fontSize:'.4rem'}}>{rest.data.可用资金}</p>
            </div>
            <ul styleName="pay-wrap">
                <li onClick={() => {router.push({pathname:'/payType'})}} style={{paddingRight:'.15rem'}}>
                    <a href="#/payType">充值</a>
                </li>
                <li onClick={rest.deposit} style={{paddingLeft:'.15rem'}}>
                    <a ng-click="doWithdraw();">提现</a>
                </li>
            </ul>
        </div>
    );
};

const mapStateToProps = state => ({
    data:state.personal.data
})

const mapDispatchToProps = (dispatch,props) => ({
    deposit:() => {
        router.push({
            pathname:'/withdraw'
        })
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(CSSModules(UserInfo, styles))

