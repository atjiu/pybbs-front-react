import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {showToast} from '../actions/toast';
import Axios from '../js/axios';
import Loading from './Loading';

class EditTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: this.props.match.params.id,
      topic: {},
      enable_redirect: false,
      redirect_url: '/login'
    }
  }

  componentWillMount() {
    Axios.get('/topic/detail', {
      params: {
        id: this.state.id,
        mdrender: false
      }
    }).then(({ data }) => {
      if (data.code === 200) {
        this.setState({
          loading: false,
          topic: data.detail.topic
        })
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
  }

  componentDidMount() {
    const username = localStorage.getItem("username");
    this.setState({
      enable_redirect: username == null,
      redirect_url: '/login'
    })
  }

  updateTopic() {
    const tab = this.refs.tab[this.refs.tab.selectedIndex].value;
    const title = this.refs.title.value;
    const url = this.refs.url.value;
    const content = this.refs.content.value;
    if (!title) {
      this.props.dispatch(showToast("标题不能为空"));
      return;
    }
    Axios.post('/topic/update', {
      id: this.state.id,
      tab: tab,
      title: title,
      url: url,
      content: content
    }).then(({data}) => {
      if (data.code === 200) {
        this.setState({
          enable_redirect: true,
          redirect_url: "/topic/" + this.state.id
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
        {
          this.state.loading
          ? <Loading/>
          : <table border="0" width="100%" className="create-topic">
              <caption><h3>编辑话题</h3></caption>
              <tbody>
                <tr>
                  <th width="10%">分类</th>
                  <td>
                    <select ref="tab" defaultValue={this.state.topic.tab}>
                      <option value="ask">问答</option>
                      <option value="share">分享</option>
                      <option value="blog">博客</option>
                      <option value="job">招聘</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>标题</th>
                  <td><input type="text" ref="title" defaultValue={this.state.topic.title} className="form-input" placeholder="标题" /></td>
                </tr>
                <tr>
                  <th>外链</th>
                  <td><input type="text" ref="url" defaultValue={this.state.topic.url} className="form-input" placeholder="如果是转载的，就没必复制内容了" /></td>
                </tr>
                <tr>
                  <th valign="top">内容</th>
                  <td><textarea ref="content" className="form-content" placeholder="话题内容，支持Markdown语法" defaultValue={this.state.topic.content}></textarea></td>
                </tr>
                <tr>
                  <th valign="top">&nbsp;</th>
                  <td><button onClick={() => this.updateTopic()}>更新</button></td>
                </tr>
              </tbody>
            </table>
        }
      </section>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(EditTopic))