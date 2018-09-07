import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Axios from '../js/axios';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';

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
        localStorage.setItem("accessToken", data.detail);
        localStorage.setItem("username", username);
        Axios.defaults.headers.common['Authorization'] = "Bearer " + data.detail
        this.setState({
          enable_redirect: true
        });
      } else {
        this.props.dispatch(showToast(data.description, 3000));
      }
    }).catch(err => this.props.dispatch(showToast(err, 3000)));
  }

  render() {
    return (
      <section className="animated fadeIn">
        {this.state.enable_redirect ? <Redirect to={this.state.redirect_url} /> : null}
        <table border="0">
          <caption><h3>注册</h3></caption>
          <tbody>
            <tr>
              <td>用户名</td>
              <td><input type="text" ref="username" placeholder="用户名" /></td>
            </tr>
            <tr>
              <td>密码</td>
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