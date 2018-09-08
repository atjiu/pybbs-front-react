import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout} from '../actions/header';
import { Link, withRouter, Redirect } from 'react-router-dom';

class Header extends Component {
  logout() {
    if (window.confirm('确定要登出吗？')) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      this.props.dispatch(logout())
    }
  }

  render() {
    return (
      <div className="header">
        {this.props.header.enable_redirect ? <Redirect to={this.props.header.redirect_url} /> : null}
        <Link to="/" className="logo">朋也社区</Link>
        {
          this.props.header.username ?
            <div className="right">
              <Link to='/topic/create'>创建话题</Link>
              <Link to={'/user/' + this.props.header.username}>{this.props.header.username}</Link>
              <Link to='/user/settings'>设置</Link>
              <span onClick={() => this.logout()}>登出</span>
            </div>
            :
            <div className="right">
              <Link to="/login">登录</Link>
              <Link to="/register">注册</Link>
            </div>
        }
      </div>
    )
  }
}

export default connect((state) => {
  return { header: state.header }
})(withRouter(Header))