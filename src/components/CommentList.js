import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { showToast } from '../actions/toast';
import Loading from './Loading';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Axios from '../js/axios';
import DefaultAvatar from '../imgs/default-avatar.jpg';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: localStorage.getItem("username"),
      admin: localStorage.getItem("admin"),
      topicId: this.props.topicId,
      replyId: '',
      comments: this.props.comments
    }
  }
  componentDidMount() {
    this.setState({
      loading: false
    })
  }
  createComment = (e) => {
    if (e.charCode === 13 && (e.ctrlKey || e.metaKey)) {
      if (!this.state.username) {
        this.props.dispatch(showToast("您还没有登录哦..."))
        return;
      }
      const content = this.refs.content.value;
      Axios.post("/comment/create", {
        topicId: this.state.topicId,
        content: content,
        commentId: this.state.replyId
      }).then(({data}) => {
        if(data.code === 200) {
          this.setState({
            comments: this.state.comments.concat(data.detail),
            replyId: ''
          });
          this.refs.content.value = "";
        } else {
          this.props.dispatch(showToast(data.description))
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
    }
  }
  deleteHandler(id, i) {
    console.log (id, i)
    if (window.confirm("删除评论要扣分的哦，真的要删除这个评论吗？")) {
      Axios.get('/comment/delete', {
        params: {
          id: id
        }
      }).then(({data}) => {
        if(data.code === 200) {
          this.state.comments.splice(i, 1)
          this.setState({
            comments: this.state.comments
          })
        } else {
          this.props.dispatch(showToast(data.description))
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
    }
  }
  render() {
    return (
      <div className="comments">
        {
          this.state.loading
            ? <Loading />
            : <div>
              <div className="comment-list">
                {
                  this.state.comments.map((v, i) => {
                    return (
                      <div key={i}>
                        <div className="comment-info">
                          <img src={v.user.avatar ? v.user.avatar : DefaultAvatar} className="avatar" alt="avatar" />
                          <span><Link to={'/user/' + v.user.username}>{v.user.username}</Link></span>&nbsp;
                          <span>{moment(v.inTime).fromNow()}</span>&nbsp;
                          {
                            v.user.username === this.state.username || this.state.admin === 'true'
                            ? <span><span onClick={() => this.deleteHandler(v.id, i)}>删除</span>&nbsp;</span>
                            : null
                          }
                        </div>
                        <p className="comment-content" dangerouslySetInnerHTML={{__html: v.content}}></p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        }
        <div className="comment-editor">
          <textarea ref="content" rows="5" onKeyPress={this.createComment} placeholder="写点什么! (不支持Markdown语法, Ctrl+Enter提交)"></textarea>
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(CommentList))