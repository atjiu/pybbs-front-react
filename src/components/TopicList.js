import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';
import { withRouter, Link } from 'react-router-dom';
import Axios from '../js/axios';
import Loading from './Loading';
import moment from 'moment';
import 'moment/locale/zh-cn';
import DefaultAvatar from '../imgs/default-avatar.jpg';

class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pageNo: 1,
      tab: '',
      topics: [],
      tabs: { 'ask': '问答' }
    }
  }
  componentWillMount() {
    if (this.state.topics.length === 0 || !this.state.loading) {
      Axios.get('/', {
        params: {
          tab: this.state.tab,
          pageNo: this.state.pageNo
        }
      }).then(({ data }) => {
        if (data.code === 200) {
          this.setState({
            loading: false,
            pageNo: this.state.pageNo + 1,
            topics: data.detail.content
          })
        } else {
          this.props.dispatch(showToast(data.description))
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
    }
  }
  render() {
    return (
      <div className="topic-list">
        {
          this.state.loading
            ? <Loading />
            : null
        }
        <ul>
          {
            this.state.topics.map(function (v, i) {
              let tab = "";
              if (v.tab === "ask") {
                tab = "问答"
              } else if (v.tab === "blog") {
                tab = "博客"
              } else if (v.tab === "share") {
                tab = "分享"
              } else if (v.tab === "job") {
                tab = "招聘"
              } else if (v.good) {
                tab = "精华"
              } else if (v.top) {
                tab = "置顶"
              }
              return (
                <li key={i}>
                  <img src={v.user.avatar ? v.user.avatar : DefaultAvatar} className="avatar" alt="avatar"/>
                  <div className="topic">
                    <div className="title"><Link to={'/topic/' + v.id}>{v.title}</Link></div>
                    <div className="topic-info">
                      <span>{v.commentCount}/{v.view}</span>&nbsp;•&nbsp;
                      <span className="tab">{tab}</span>&nbsp;•&nbsp;
                      <span><Link to={'/user/' + v.user.username}>{v.user.username}</Link></span>&nbsp;•&nbsp;
                      <span>{moment(v.inTime).fromNow()}</span>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(TopicList))