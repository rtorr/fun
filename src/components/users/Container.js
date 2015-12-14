import React from 'react';
import {WelpComponent} from 'welp';
import {get_user} from './Actions';
import Store from './Store';

class User extends WelpComponent {
  constructor(props) {
    super(props, [Store]);
    get_user({username: this.props.params.username});
  }

  render() {
    return (
      <div className="user">
        <div className="user__container">
          {this.state.user.found ?
            <p>Hello {this.state.user.username}! your id is {this.state.user.uid}</p> : 'Sorry not found'}
        </div>
      </div>
    );
  }
}

export default User;
