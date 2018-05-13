import Header from '../../components/header/header'
import router from 'umi/router'
import {WhiteSpace} from 'antd-mobile'

export default () => (
    <div>
        <Header
            title={sessionStorage.getItem('guide_title')}
            leftCallBak={() => {router.goBack()}}
        />
        <WhiteSpace size={"lg"}/>
        <div style={{padding:'0 .15rem'}} dangerouslySetInnerHTML={{
            __html: sessionStorage.getItem('guide_content')
        }}/>
    </div>
)
