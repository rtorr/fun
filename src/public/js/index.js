import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route} from 'react-router';
import history from './../../lib/history';
import Layout from 'components/layout/Container';
import Login from 'components/layout/views/Login';
import Index from 'components/index/Container';
import PostList from 'components/post_list/Container';
import PostCreate from 'components/post_create/Container';
import User from 'components/users/Container';

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Index}/>
      <Route path="/login" component={Login} />
      <Route path="/post/create" component={PostCreate} />
      <Route path="/post/edit/:post_id" component={PostCreate} />
      <Route path="/users/:username" component={User} />
      <Route path="/posts" component={PostList} />
    </Route>
  </Router>
), document.getElementById('_js-app'));
