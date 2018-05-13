import CSSModules from 'react-css-modules'
import styles from '../styles/personal.css'
import Link from 'umi/link'

const Example = () => {
    return (
        <div>
            <div styleName="mod-menu">
                <Link to={'/fund'}>
                    <i styleName="iconfont" data-icon="detail" style={{backgroundColor:'#5C8FE8'}}></i>
                    资金明细
                    <i styleName="mod-arrow-r"></i>
                </Link>
            </div>
            <div styleName="mod-menu">
                <Link to={'/myInfo'}>
                    <i styleName="iconfont" data-icon="my" style={{backgroundColor:'#FF9B34'}}></i>
                    个人信息
                    <i styleName="mod-arrow-r"></i>
                </Link>
                <Link to={'/myPacket'}>
                    <i styleName="iconfont" data-icon="money" style={{backgroundColor:'#FF0000'}}></i>
                    我的红包
                    <i styleName="mod-arrow-r"></i>
                </Link>
                <Link to={'/union'}>
                    <i styleName="iconfont" data-icon="invite" style={{backgroundColor:'#F16A33'}}></i>
                    邀请好友
                    <i styleName="mod-arrow-r"></i>
                </Link>
                <Link to={'/investor'}>
                    <i styleName="iconfont" data-icon="apply" style={{backgroundColor:'#D976A2'}}></i>
                    申请投资人
                    <i styleName="mod-arrow-r"></i>
                </Link>
            </div>
        </div>
    );
};


export default CSSModules(Example, styles)

