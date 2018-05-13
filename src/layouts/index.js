import React from 'react';
import withRouter from 'umi/withRouter';
import Footer from './footer'
import {Toast} from 'antd-mobile'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Layout extends React.Component{
    render(){
        const {children,location} = this.props;
        const pathname = location.pathname;
        const has_foot = pathname === '/' || pathname === '/news' || pathname === '/discover' || pathname === '/personal';
        return (
            <ReactCSSTransitionGroup
                component="div"
                transitionName="page"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
            >
            <div key={pathname} className={pathname}>
                <div>
                    {children}
                </div>
                {has_foot ? <Footer/> : ''}
            </div>
            </ReactCSSTransitionGroup>
        );
    }
}
export default withRouter(Layout);
