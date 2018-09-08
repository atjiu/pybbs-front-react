import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';
import Loading from './Loading';
import DefaultAvatar from '../imgs/default-avatar.jpg';
import Axios from '../js/axios';
import moment from 'moment';
import 'moment/locale/zh-cn.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.match.params.username,
      loading_info: true,
      loading_topics: true,
      loading_comments: true,
      info: {},
      topics: [],
      comments: []
    }
  }

  componentDidMount() {
    // 加载用户信息
    Axios.get('/user/' + this.state.username)
      .then(({ data }) => {
        if (data.code === 200) {
          this.setState({
            loading_info: false,
            info: data.detail
          })
        } else {
          this.props.dispatch(showToast(data.description))
        }
      })
      .catch(err => this.props.dispatch(showToast(err.toString())));
    // 加载用户的话题
    Axios.get('/user/' + this.state.username + '/topics', {
      params: {
        pageNo: 1,
        pageSize: 7
      }
    }).then(({ data }) => {
      if (data.code === 200) {
        this.setState({
          loading_topics: false,
          topics: this.state.topics.concat(data.detail.content)
        })
      } else {
        this.setState({
          loading_topics: false
        })
        this.props.dispatch(showToast(data.description))
      }
    }).catch(err => {
      this.props.dispatch(showToast(err.toString()))
    });
    // 加载用户的评论
    Axios.get('/user/' + this.state.username + '/comments', {
      params: {
        pageNo: 1,
        pageSize: 7
      }
    }).then(({ data }) => {
      if (data.code === 200) {
        this.setState({
          loading_comments: false,
          comments: this.state.comments.concat(data.detail.content)
        })
      } else {
        this.setState({
          loading_comments: false
        })
        this.props.dispatch(showToast(data.description))
      }
    }).catch(err => this.props.dispatch(showToast(err.toString())));
  }
  render() {
    let topicsHtml;
    if (this.state.topics.length > 0) {
      topicsHtml = this.state.topics.map((v, i) => {
        return (
          <tr key={i}>
            <td width="80%"><Link to={'/topic/' + v.id}>{v.title}</Link></td>
            <td>{moment(v.inTime).fromNow()}</td>
          </tr>
        )
      })
    } else {
      topicsHtml = (
        <tr>
          <td colSpan="2">暂无话题</td>
        </tr>
      )
    }
    let commentsHtml;
    if (this.state.comments.length > 0) {
      commentsHtml = this.state.comments.map((v, i) => {
        return (
          <tr key={i}>
            <td width="80%"><Link to={'/topic/' + v.id}>{v.topic.title}</Link></td>
            <td>{moment(v.inTime).fromNow()}</td>
          </tr>
        )
      })
    } else {
      commentsHtml = (
        <tr>
          <td colSpan="2">暂无评论</td>
        </tr>
      )
    }
    return (
      <div>
        {
          this.state.loading_info ?
            <Loading />
            :
            <section className="user-info animated bounce">
              <div className="info">
                {
                  this.state.info
                    ? <div>
                      <img src={this.state.info.avatar ? this.state.info.avatar : DefaultAvatar} className="avatar-lg" alt="avatar" />
                      <ul className="profile">
                        <li>积分 {this.state.info.score}&nbsp;&nbsp;<Link to="/top100">TOP100</Link></li>
                        <li className="username">{this.state.info.username}</li>
                        <li>{this.state.info.email}</li>
                        <li><a href={this.state.info.website}>{this.state.info.website}</a></li>
                        <li>{this.state.info.bio}</li>
                      </ul>
                    </div>
                    : <p>用户不存在</p>
                }
              </div>
              <div className="topics-comments">
                {
                  this.state.loading_topics
                    ? <Loading />
                    : <div className="topics">
                      <table border="0">
                        <caption>{this.state.username} 的话题</caption>
                        <tbody>
                          {topicsHtml}
                        </tbody>
                      </table>
                    </div>
                }
                {
                  this.state.loading_comments
                    ? <Loading />
                    : <div className="comments">
                      <table border="0">
                        <caption>{this.state.username} 的评论</caption>
                        <tbody>
                          {commentsHtml}
                        </tbody>
                      </table>
                    </div>
                }
              </div>
            </section>
        }
      </div>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(UserProfile))