import React, { Component } from 'react';
import Axios from '../js/axios';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';
import { Link, withRouter } from 'react-router-dom';
import Loading from './Loading';
import moment from 'moment';
import 'moment/locale/zh-cn';
import DefaultAvatar from '../imgs/default-avatar.jpg';
import CommentList from './CommentList';

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      loading: true,
      topic: {},
      topicUser: {},
      comments: []
    }
  }
  componentWillMount() {
    Axios.get('/topic/detail', {
      params: {
        id: this.state.id,
        mdrender: true
      }
    }).then(({ data }) => {
      if (data.code === 200) {
        this.setState({
          loading: false,
          topic: data.detail.topic,
          topicUser: data.detail.topic.user,
          comments: data.detail.comments
        })
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => this.props.dispatch(showToast(err)))
  }
  render() {
    let tab = "";
    if (this.state.topic.tab === "ask") {
      tab = "问答"
    } else if (this.state.topic.tab === "blog") {
      tab = "博客"
    } else if (this.state.topic.tab === "share") {
      tab = "分享"
    } else if (this.state.topic.tab === "job") {
      tab = "招聘"
    }
    return (
      <section className="animated fadeIn">
        {
          this.state.loading
            ? <Loading />
            : (
              <div>
                <div className="topic-detail">
                  <div className="topic">
                    <div className="title">{this.state.topic.title}</div>
                    <div className="topic-info">
                      <span>{this.state.topic.commentCount}/{this.state.topic.view}</span>&nbsp;•&nbsp;
                      <span className="tab">{tab}</span>&nbsp;•&nbsp;
                      <span><Link to={'/user/' + this.state.topicUser.username}>{this.state.topicUser.username}</Link></span>&nbsp;•&nbsp;
                      <span>{moment(this.state.topic.inTime).fromNow()}</span>
                    </div>
                  </div>
                  <img src={this.state.topicUser.avatar ? this.state.topicUser.avatar : DefaultAvatar} className="avatar" alt="avatar" />
                </div>
                {
                  this.state.topic.content 
                  ? <div className="topic-content" dangerouslySetInnerHTML={{__html: this.state.topic.content}}></div>
                  : null
                }
                <CommentList comments={this.state.comments} topicId={this.state.topic.id}/>
              </div>
            )
        }
      </section>
    );
  }
}

export default connect((state) => {
  return {}
})(withRouter(TopicDetail));