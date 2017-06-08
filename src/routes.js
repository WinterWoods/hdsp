import React from 'react'
import { Router, Route, IndexRoute, Link, IndexLink, hashHistory } from 'react-router'
import App from 'App'
import NoMatch from 'noMatch'
import About from 'pages/about'
import Test from 'pages/about'

  //<IndexRoute component={SamplePage}/>
  //<Route path="pageA" component={PageA}/>

var routes = (<Router history = {hashHistory}>
    <Route path="/" component = {App}>
      <IndexRoute component={About}/>
      <Route path="/about" component={About}/>
      <Route path="/test" component={Test}/>
      
    </Route><Route path="*"component={NoMatch}/>
  </Router>);
export default routes
