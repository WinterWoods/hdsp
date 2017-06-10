import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';

import App from './routes/app';
import Index from './routes/pages/index';

function RouterConfig({ history }) {
    return (<Router history={history} >
        <Route path="/"
            component={App} >
            <IndexRoute component={Index} />
        </Route>
    </Router>
    );
}

export default RouterConfig;