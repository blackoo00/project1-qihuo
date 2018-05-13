import CSSModules from 'react-css-modules'
import styles from '../styles/login.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import Button from '../../../components/button/button'
import {createForm} from 'rc-form'
import {Toast,Picker} from 'antd-mobile'
import router from 'umi/router'
// import Link from 'umi/link'
import config from '../../../utils/config'

const pickerData = [{label:'实盘',value:0},{label:'模拟',value:1}];

const Login = ({...rest}) => (
    <div styleName="mod-login">
        <Header
            back={true}
            bgColor={'#20212b'}
        />
        <div styleName="logo">
            <div styleName="logo-img"></div>
        </div>
        <div styleName="forms">
            <Picker onChange={rest.assignSev} cols={1} data={pickerData}>
            <div styleName="mod-form">
                    <label>类型</label>
                    <input type="text" styleName="inp" value={pickerData[rest.sev]['label']} readOnly/>
                {/*<select style={{width: '1.72rem', height: '0.3rem'}} styleName="inp" onChange={rest.assignSev} defaultValue={rest.sev}>*/}
                    {/*<option value="0">实盘</option>*/}
                    {/*<option value="1">模拟</option>*/}
                {/*</select>*/}
            </div>
            </Picker>
            <div styleName="mod-form">
                <label>账号</label><input {...rest.form.getFieldProps('account', {
                initialValue: '',
                rules: [{
                    required: true, message: '请输入您的账号',
                }],
            })} type="text" styleName="inp" placeholder="用户名、手机号"/>
            </div>
            <div styleName="mod-form">
                <label>密码</label><input {...rest.form.getFieldProps('password', {
                initialValue: '',
                rules: [{
                    required: true, message: '请输入登录密码',
                }],
            })} type="password" styleName="inp" placeholder="请输入登录密码"/>
            </div>
        </div>
        <div styleName="action">
            <div>
                <Button
                    title={'登录'}
                    callBack={rest.submit(rest.sev)}
                />
            </div>
            <div style={{marginTop: '.15rem'}}>
                <Button
                    title={'免费注册'}
                    bgColor={'#E34C4D'}
                    callBack={() => {router.push('/register')}}
                />
            </div>
            <div styleName="links">
                <a href={"tel:"+config.SERVICE_TEL}>联系客服</a>
                {/*<Link to="/forget">忘记密码</Link>*/}
            </div>
        </div>
    </div>
)

const mapStateToProps = state => ({
    sev:state.login.sev
})

const mapDispatchToProps = (dispatch, props) => ({
    assignSev:(v) => {
        dispatch({
            type:'login/assignSev',
            sev:v
        })
    },
    submit: sev => () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    type: 'login/LoginIn',
                    values: {account: value.account, password: value.password, sev: sev},
                });
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps, mapDispatchToProps)(CSSModules(Login, styles)))
