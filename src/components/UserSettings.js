import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { showToast } from '../actions/toast';
import { updateHeader } from '../actions/header';
import Loading from './Loading';
import Axios from '../js/axios';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {},
      enable_redirect: false,
      redirect_url: '/login'
    }
  }
  componentWillMount() {
    const username = localStorage.getItem("username");
    if (!username) {
      this.setState({
        enable_redirect: true
      })
    } else {
      Axios.get('/user/settings/profile')
        .then(({ data }) => {
          if (data.code === 200) {
            this.setState({
              loading: false,
              user: data.detail
            });
            localStorage.setItem("admin", data.detail.admin);
          } else {
            this.props.dispatch(showToast(data.description))
          }
        }).catch(err => this.props.dispatch(showToast(err.toString())));
    }
  }
  save() {
    const avatar = this.refs.avatar.value;
    const email = this.refs.email.value;
    const website = this.refs.website.value;
    Axios.post("/user/settings/profile", {
      avatar: avatar,
      email: email,
      website: website
    }).then(({ data }) => {
      if (data.code === 200) {
        this.props.dispatch(showToast('修改成功'));
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
  }
  updatePassword() {
    const rawPassword = this.refs.rawPassword.value;
    const newPassword = this.refs.newPassword.value;
    if (!rawPassword || !newPassword) {
      this.props.dispatch(showToast('原密码和新密码都不能为空'));
      return;
    }
    Axios.post("/user/settings/updatePassword", {
      rawPassword: rawPassword,
      newPassword: newPassword
    }).then(({ data }) => {
      if (data.code === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        this.props.dispatch(showToast('修改成功, 请重新登录'));
        this.props.dispatch(updateHeader());
        this.setState({
          enable_redirect: true
        })
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
  }
  render() {
    return (
      <section className="animated bounce user-settings">
        {
          this.state.loading
          ? <Loading/>
          : <div className="user-settings">
              {
                this.state.enable_redirect
                  ? <Redirect to={this.state.redirect_url} />
                  : null
              }
              <table border="0">
                <caption><h3>修改资料</h3></caption>
                <tbody>
                  <tr>
                    <td>用户名</td>
                    <td><input type="text" readOnly value={this.state.user.username} /></td>
                  </tr>
                  <tr>
                    <td>邮箱</td>
                    <td><input type="email" ref="email" value={this.state.user.email} /></td>
                  </tr>
                  <tr>
                    <td>头像</td>
                    <td><input type="text" ref="avatar" value={this.state.user.avatar} /></td>
                  </tr>
                  <tr>
                    <td>个人主页</td>
                    <td><input type="text" ref="website" value={this.state.user.website} /></td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="right">
                      <button onClick={() => this.save()}>保存</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table border="0">
                <caption><h3>修改密码</h3></caption>
                <tbody>
                  <tr>
                    <td>原密码</td>
                    <td><input type="password" ref="rawPassword" /></td>
                  </tr>
                  <tr>
                    <td>新密码</td>
                    <td><input type="password" ref="newPassword" /></td>
                  </tr>
                  <tr>
                    <td colSpan="2" align="right">
                      <button onClick={() => this.updatePassword()}>更新</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
        }
      </section>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(UserSettings))