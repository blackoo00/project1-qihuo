import React from 'react';
import {connect} from 'dva';
import Home from './home/page';

function IndexPage() {
    return (
        <div>
            <Home/>
        </div>
    );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
