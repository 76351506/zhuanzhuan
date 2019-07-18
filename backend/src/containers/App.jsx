import React from 'react';
import RouterView from '@/router';
import '@/assets/css/reset.css';
import '@/assets/css/common.css';
import '@/assets/css/iconfont.css';

function componentName({ history }) {
    return <RouterView history={history}></RouterView>
}

export default componentName
