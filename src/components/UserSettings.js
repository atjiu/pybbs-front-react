import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {showToast} from '../actions/toast';
import Loading from './Loading';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {}
    }
  }
  render() {
    return (
      <section className="animated fadeIn">
        <table border="0">
          <caption><h3>修改资料</h3></caption>
          <tbody>
            <tr>
              <td>用户名</td>
              <td><input type="text" readOnly value={this.state.user.username}/></td>
            </tr>
            <tr>
              <td>邮箱</td>
              <td><input type="email" value={this.state.user.email}/></td>
            </tr>
            <tr>
              <td>个人主页</td>
              <td><input type="text" value={this.state.user.webSite}/></td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(UserSettings))