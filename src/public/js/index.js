import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route} from 'react-router';
import Layout from 'components/layout/Container';
import Annotate from 'components/annotate/Container';
import User from 'components/users/Container';

ReactDOM.render((
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={Annotate}/>
      <Route path="/users/:username" component={User} />
    </Route>
  </Router>
), document.getElementById('_js-app'));
