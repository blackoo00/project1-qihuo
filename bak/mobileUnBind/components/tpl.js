import CSSModules from 'react-css-modules'
import styles from '../../register/styles/register.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import Button from '../../../components/button/button'

const Example = () => {
    return (
        <div>
            <Header
                title={'修改绑定手机号'}
                url={'/myInfo'}
            />
            <div styleName="mod-form-wrap" style={{marginTop: '.2rem'}}>
                <div styleName="mod-form">
                    <label>原手机号码</label>
                    <span style={{float:'right',color:'#999',marginRight:'.3rem'}}>1234</span>
                </div>
                <div styleName="mod-form">
                    <span styleName="tip-r">获取验证码</span>
                    <label>验证码</label><input value={''} type="tel" styleName="inp"
                                             placeholder="请输入验证码" style={{width: '0.9rem'}}/>
                </div>
            </div>
            <div style={{padding: '.2rem .15rem'}}>
                <Button
                    title={'下一步'}
                />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles))

