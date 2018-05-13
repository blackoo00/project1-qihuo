import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import Header from '../../../components/header/header'
import {InputItem} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'
import {Toast} from 'antd-mobile';

const Example = ({form}) => {
    return (
        <div>
            <Header
                title={'实名认证'}
                url={'/myInfo'}
            />
            <div style={{marginTop: '.16rem'}}>
                <InputItem
                    {...form.getFieldProps('account', {
                        rules: [
                            {required: true, message: '请输入真实姓名'},
                        ],
                    })}
                    error={!!form.getFieldError('account')}
                    onErrorClick={() => {
                        alert(form.getFieldError('account').join('、'));
                    }}
                    placeholder="请输入真实姓名"
                >真实姓名</InputItem>
                <InputItem
                    {...form.getFieldProps('IDNum', {
                        rules: [
                            {
                                required: true,
                                pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                                message: '请输入正确的身份证号'
                            },
                        ],
                    })}
                    error={!!form.getFieldError('IDNum')}
                    onErrorClick={() => {
                        alert(form.getFieldError('IDNum').join('、'));
                    }}
                    placeholder="请输入身份证号"
                >身份证号</InputItem>
            </div>
            <div style={{padding: '.3rem .15rem'}}>
                <Button
                    title={'认证'}
                />
            </div>
            <div style={{textAlign: 'center', fontSize: '.1rem', color: '#999'}}>
                如遇到问题，请<a style={{color: '#5B78C0'}} href="tel:123">联系客服</a>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch, props) => ({
    submit: () => {
        props.form.validateFields({force: true}, (error) => {
            if (!error) {
                let value = props.form.getFieldsValue();
                dispatch({
                    type: 'register/submit',
                    values: value
                })
            } else {
                const errors = Object.values(error);
                Toast.info(errors[0]['errors'][0]['message'], 1);
            }
        });
    }
})

export default createForm()(connect(mapStateToProps, mapDispatchToProps)(CSSModules(Example, styles)))

