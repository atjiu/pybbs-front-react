import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Axios from '../js/axios';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';
import {updateHeader} from '../actions/header';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect_url: '/',
      enable_redirect: false
    }
  }

  register() {
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    Axios.post('/register', {
      username: username,
      password: password
    }).then(({ data }) => {
      if (data.code === 200) {
        localStorage.setItem("accessToken", data.detail.token);
        localStorage.setItem("username", username);
        localStorage.setItem("admin", data.detail.admin);
        this.props.dispatch(updateHeader());
        Axios.defaults.headers.common['Authorization'] = "Bearer " + data.detail.token
        this.setState({
          enable_redirect: true
        });
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())));
  }

  render() {
    return (
      <section className="animated fadeIn">
        {this.state.enable_redirect ? <Redirect to={this.state.redirect_url} /> : null}
        <table border="0" className="login-register">
          <caption><h3>注册</h3></caption>
          <tbody>
            <tr>
              <th>用户名</th>
              <td><input type="text" ref="username" placeholder="用户名" /></td>
            </tr>
            <tr>
              <th>密码</th>
              <td><input type="password" ref="password" placeholder="密码" /></td>
            </tr>
            <tr>
              <td colSpan="2" valign="middle">
                <div className="action">
                  <span>已有帐号？<Link to="/login">去登录</Link></span>
                  <button onClick={() => this.register()}>注册</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(Register))