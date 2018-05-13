import Iframe from 'react-iframe'

const KIframe = ({url}) => (
    <Iframe
        url={url}
        width={document.body.clientWidth + "px"}
        height="2.4rem"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
)

export default KIframe
