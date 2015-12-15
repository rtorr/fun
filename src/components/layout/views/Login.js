import React from 'react';
import {login} from './../Actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUserNameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var username = this.state.username.trim().toLowerCase();
    var password = this.state.password.trim().toLowerCase();
    if (!username || !password) {
      return;
    }
    login(this.state);
    this.setState({username: '', password: ''});
  }

  render() {
    return (
      <div className="login">
        <h2 className="login__heading">Please sign in or create a new account</h2>
        <form onSubmit={this.handleSubmit}>
          <input className="login__input login__input-text" onChange={this.handleUserNameChange} value={this.state.username} type="text" name="username" placeholder="username"/>
          <input className="login__input login__input-text" onChange={this.handlePasswordChange}  value={this.state.password} type="password" name="password" placeholder="password"/>
          <input className="login__input login__input-submit" type="submit" value="lets blog!" />
        </form>
        <div className="login__hint">
          <p>Hint: You only need an username and password to register.</p>
        </div>
      </div>
    );
  }
}

export default Login;
