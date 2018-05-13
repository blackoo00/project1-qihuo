import CSSModules from 'react-css-modules'
import styles from '../styles/tpl.css'
import {connect} from 'dva'
import {InputItem,WhiteSpace} from 'antd-mobile'
import {createForm} from 'rc-form'
import Button from '../../../components/button/button'
import config from '../../../utils/config'

const Example = ({...rest}) => {
    return (
        <div>
            <InputItem
                defaultValue={'0.00元'}
                editable={false}
            >
                账户余额：
            </InputItem>
            <WhiteSpace size={'lg'}/>
            <InputItem
                defaultValue={'账号'}
                editable={false}
            >
                支付宝实名
            </InputItem>
            <InputItem
                {...rest.form.getFieldProps('account',{
                    initialValue:'',
                    rules:[{
                        required:true,message:'请输入支付宝账号'
                    }]
                })}
                placeholder={'请输入支付宝账号'}
            >
                支付宝账号
            </InputItem>
            <InputItem
                {...rest.form.getFieldProps('pay',{
                    initialValue:'',
                    rules:[{
                        required:true,message:'请输入金额'
                    }]
                })}
                type={'money'}
                moneyKeyboardAlign={'left'}
                placeholder={'请输入金额'}
            >
                充值金额
            </InputItem>
            <div style={{padding:'.3rem .15rem'}}>
                <Button
                    title={'下一步'}
                    callBack={() => {console.log(1)}}
                />
            </div>
            <div styleName="mod-prompt">
                <p styleName="txt-center">到账时间</p>
                <p> 08:30-17:30<span styleName="fr">(1小时内到账)</span></p>
                <p>17:30以后<span styleName="fr">(次日09:30前到账)</span></p>
                <p>如急需到账，请电话<a styleName="txt-blue" href={"tel:"+config.SERVICE_TEL}>联系客服</a>。</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    headerText:state.pay.headerText
})

const mapDispatchToProps = (dispatch,props) => ({
})

export default createForm()(connect(mapStateToProps,mapDispatchToProps)(CSSModules(Example,styles)))

