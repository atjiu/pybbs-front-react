import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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
      comments: this.props.comments,
      updateId: '',
      updateIndex: -1,
      action: 'create'
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
      this.saveOrUpdateComment();
    }
  }
  saveOrUpdateComment() {
    const content = this.refs.content.value;
    if (this.state.action === 'create') {
      Axios.post("/comment/create", {
        topicId: this.state.topicId,
        content: content,
        commentId: this.state.replyId
      }).then(({ data }) => {
        if (data.code === 200) {
          this.setState({
            comments: this.state.comments.concat(data.detail),
            replyId: ''
          });
          this.refs.content.value = "";
        } else {
          this.props.dispatch(showToast(data.description))
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
    } else if (this.state.action === 'update') {
      Axios.post("/comment/update", {
        id: this.state.updateId,
        content: content
      }).then(({ data }) => {
        if (data.code === 200) {
          let comments = this.state.comments;
          comments[this.state.updateIndex].content = content;
          this.setState({
            comments: comments,
            updateId: '',
            updateIndex: -1
          });
          this.refs.content.value = "";
          // 下面这两行不知道干啥的了。。
          // const anchorElement = this.refs[this.state.updateId];
          // anchorElement.focus();
        } else {
          this.props.dispatch(showToast(data.description))
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
    }
  }
  deleteHandler(id, i) {
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
  replyComment(replyId, username){
    if (!this.state.username) {
      this.props.dispatch(showToast("您还没有登录哦..."))
      return;
    }
    this.setState({
      replyId: replyId
    }, () => {
      let contentE = this.refs.content;
      contentE.value = (contentE.value.length > 0 ? contentE.value + ' ' : '') + '@' + username + ' ';
      this.refs.content.focus();
    });
  }
  updateHandler(id, index, content) {
    this.setState({
      updateId: id,
      updateIndex: index,
      action: 'update'
    }, () => {
      this.refs.content.value = content;
      this.refs.content.focus();
    })
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
                      <div key={i} ref={v.id} id={v.id} reply-id={v.commentId}>
                        <div className="comment-info">
                          <img src={v.user.avatar ? v.user.avatar : DefaultAvatar} className="avatar" alt="avatar" />
                          <span><Link to={'/user/' + v.user.username}>{v.user.username}</Link></span>&nbsp;
                          <span>{moment(v.inTime).fromNow()}</span>&nbsp;
                          {
                            v.user.username === this.state.username || this.state.admin === 'true'
                            ? <span>
                                <span onClick={() => this.updateHandler(v.id, i, v.content)}>编辑</span>&nbsp;
                                <span onClick={() => this.deleteHandler(v.id, i)}>删除</span>&nbsp;
                              </span>
                            : null
                          }
                          <span onClick={() => this.replyComment(v.id, v.user.username)}>回复</span>
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
          <textarea
            ref="content"
            rows="5"
            onKeyPress={this.createComment}
            defaultValue={this.state.commentContent}
            placeholder="写点什么! (不支持Markdown语法, Ctrl+Enter提交)"/>
        </div>
        <button onClick={() => this.saveOrUpdateComment()} className="commentBtn">评论</button>
      </div>
    )
  }
}

export default connect((state) => {
  return {}
})(withRouter(CommentList))