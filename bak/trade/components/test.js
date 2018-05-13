import Iframe from 'react-iframe'

const Test = () => (
    <Iframe url="http://127.0.0.1/hdl-test/test1/"
            width="450px"
            height="450px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen/>
)

export default Test
