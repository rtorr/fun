import React from 'react';
import {Link} from 'react-router';
import Login from './views/Login';
import {WelpComponent} from 'welp';
import Store from './Store';
import {logout} from './Actions';

class Layout extends WelpComponent {

  constructor(props) {
    super(props, [Store]);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    logout();
  }

  render() {
    const {logged_in, username} = this.state.user;
    const child = logged_in ? this.props.children : <Login />;
    return (
      <div className="layout">
        <div className="layout__heading">
          <div className="layout__heading__logo"><Link to="/">lets annotate!</Link></div>
          {logged_in ?
            <div className="layout__heading__options">
              <Link to={`/users/${username}`}>profile</Link>
              <a onClick={this.handleLogout}>logout</a>
            </div>
            : ''}
        </div>
        {child}
      </div>
    );
  }
}

Layout.propTypes = {
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.element
};

export default Layout;
