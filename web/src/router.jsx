import React from 'react';
import { Router, Route ,IndexRoute} from 'dva/router';

import IndexPage from './routes/Home';
import Main from './routes/BS';
import Page1 from './routes/BS/page1';
import Page2 from './routes/BS/page2';

import App from './routes/Manager/app';
import Test from './routes/Manager/pages/test';
import WorkBench from './routes/Manager/pages/workBench';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
      </Route>
      <Route path="/bs" component={Main} >
        <IndexRoute component={Page1} />
        <Route path="/bs/yy" component={Page2} />
      </Route>
      <Route path="/manager" component={App} >
        <IndexRoute component={WorkBench} />
        <Route path="/manager/test" component={Test} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
