import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {showToast} from '../actions/toast';
import Axios from '../js/axios';

class CreateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enable_redirect: false,
      redirect_url: '/login'
    }
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    this.setState({
      enable_redirect: username == null,
      redirect_url: '/login'
    })
  }

  create() {
    const tab = this.refs.tab[this.refs.tab.selectedIndex].value;
    const title = this.refs.title.value;
    const url = this.refs.url.value;
    const content = this.refs.content.value;
    if (!title) {
      this.props.dispatch(showToast("标题不能为空"));
      return;
    }
    Axios.post('/topic/create', {
      tab: tab,
      title: title,
      url: url,
      content: content
    }).then(({data}) => {
      if (data.code === 200) {
        this.setState({
          enable_redirect: true,
          redirect_url: "/topic/" + data.detail
        })
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => console.log('error', err));
  }

  render() {
    return (
      <section className="animated bounce">
        {this.state.enable_redirect ? <Redirect to={this.state.redirect_url} /> : null}
        <table border="0" width="100%" className="create-topic">
          <caption><h3>创建话题</h3></caption>
          <tbody>
            <tr>
              <th width="10%">分类</th>
              <td>
                <select ref="tab">
                  <option value="ask">问答</option>
                  <option value="share">分享</option>
                  <option value="blog">博客</option>
                  <option value="job">招聘</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>标题</th>
              <td><input type="text" ref="title" className="form-input" placeholder="标题" /></td>
            </tr>
            <tr>
              <th>外链</th>
              <td><input type="text" ref="url" className="form-input" placeholder="如果是转载的，就没必复制内容了" /></td>
            </tr>
            <tr>
              <th valign="top">内容</th>
              <td><textarea ref="content" className="form-content" placeholder="话题内容，支持Markdown语法"></textarea></td>
            </tr>
            <tr>
              <th valign="top">&nbsp;</th>
              <td><button onClick={() => this.create()}>发布</button></td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(CreateTopic))