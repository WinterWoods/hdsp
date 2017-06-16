import React from 'react';
import { Router, Route ,IndexRoute} from 'dva/router';

import IndexPage from './routes/Home';
import Main from './routes/BS';
import Page1 from './routes/BS/page1';
import Page2 from './routes/BS/page2';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
      </Route>
      <Route path="/bs" component={Main} >
        <IndexRoute component={Page1} />
        <Route path="/bs/yy" component={Page2} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
