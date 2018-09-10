import React, { Component } from 'react';
import Axios from '../js/axios';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';
import { Link, withRouter, Redirect } from 'react-router-dom';
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
      username: localStorage.getItem("username"),
      admin: localStorage.getItem("admin"),
      loading: true,
      topic: {},
      collect: false,
      top: false,
      good: false,
      topicUser: {},
      comments: [],
      enable_redirect: false
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
          collect: data.detail.collect,
          top: data.detail.topic.top,
          good: data.detail.topic.good,
          topicUser: data.detail.topic.user,
          comments: data.detail.comments
        })
      } else {
        this.props.dispatch(showToast(data.description));
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
  }
  collect() {
    let collect_url = "/collect/save";
    if (this.state.collect){
      collect_url = "/collect/delete";
    }
    Axios.post(collect_url, {
      topicId: this.state.topic.id
    }).then(({data}) => {
      if(data.code === 200) {
        this.setState({
          collect: !this.state.collect
        })
      } else {
        this.props.dispatch(showToast(data.description))
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
  }
  deleteHandler() {
    if (window.confirm("删除话题要扣分的哦，真的要删除这个话题吗？")) {
      Axios.get('/topic/delete', {
        params: {
          id: this.state.topic.id
        }
      }).then(({data}) => {
        if(data.code === 200) {
          this.setState({
            enable_redirect: true
          })
        } else {
          this.props.dispatch(showToast(data.description))
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
    }
  }
  topTopic() {
    Axios.post('/topic/top', {
      id: this.state.topic.id
    }).then(({data}) => {
      if(data.code === 200) {
        this.setState({
          top: !this.state.top
        })
      } else {
        this.props.dispatch(showToast(data.description))
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
  }
  goodTopic() {
    Axios.post('/topic/good', {
      id: this.state.topic.id
    }).then(({data}) => {
      if(data.code === 200) {
        this.setState({
          good: !this.state.good
        })
      } else {
        this.props.dispatch(showToast(data.description))
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())))
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
      <section className="animated bounce">
        {
          this.state.enable_redirect
          ? <Redirect to="/"/>
          : null
        }
        {
          this.state.loading
            ? <Loading />
            : (
              <div>
                <div className="topic-detail">
                  <div className="topic">
                    <div className="title">
                      {this.state.topic.top ? <span className="top-good">[顶]</span>: null}
                      {this.state.topic.good ? <span className="top-good">[精]</span>: null}
                      {
                        this.state.topic.url
                        ? <a href={this.state.topic.url} target="_blank">{this.state.topic.title}</a>
                        : this.state.topic.title
                      }
                    </div>
                    <div className="topic-info">
                      <span>{this.state.topic.commentCount}/{this.state.topic.view}</span>&nbsp;•&nbsp;
                      <span className="tab">{tab}</span>&nbsp;•&nbsp;
                      <span><Link to={'/user/' + this.state.topicUser.username}>{this.state.topicUser.username}</Link></span>&nbsp;•&nbsp;
                      <span>{moment(this.state.topic.inTime).fromNow()}</span>
                      {
                        this.state.username
                        ? <span className="topic-actions">
                            &nbsp;•&nbsp;<span onClick={() => this.collect()}>{this.state.collect ? '取消收藏': '收藏'}</span>
                            {/* &nbsp;•&nbsp;<span>编辑</span>&nbsp;•&nbsp; */}
                            {
                              this.state.topicUser.username === this.state.username || this.state.admin === 'true'
                              ? <span>&nbsp;•&nbsp;<span onClick={() => this.deleteHandler()}>删除</span></span>
                              : null
                            }
                            {
                              this.state.admin === 'true'
                              ? <span>
                                  &nbsp;•&nbsp;<span onClick={this.topTopic.bind(this)}>{this.state.top ? '取消置顶': '置顶'}</span>
                                  &nbsp;•&nbsp;<span onClick={this.goodTopic.bind(this)}>{this.state.good ? '取消加精': '加精'}</span>
                                </span>
                              : null
                            }
                          </span>
                        : null
                      }
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