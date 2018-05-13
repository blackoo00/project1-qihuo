import Iframe from 'react-iframe'

const KIframe = ({url}) => (
    <Iframe
        url={url}
        width={document.body.clientWidth + "px"}
        height={document.documentElement.clientHeight -87-81-143 -16 + "px"}
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allowFullScreen/>
)

export default KIframe
