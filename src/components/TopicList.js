import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
import DefaultAvatar from '../imgs/default-avatar.jpg';

class TopicList extends Component {
  render() {
    return (
      <div>
        {
          this.props.topics.map(function (v, i) {
            let tab = "";
            if (v.tab === "ask") {
              tab = "问答"
            } else if (v.tab === "blog") {
              tab = "博客"
            } else if (v.tab === "share") {
              tab = "分享"
            } else if (v.tab === "job") {
              tab = "招聘"
            }
            if (v.good) {
              tab = "精华"
            }
            if (v.top) {
              tab = "置顶"
            }
            return (
              <li key={i}>
                <img src={v.user.avatar ? v.user.avatar : DefaultAvatar} className="avatar" alt="avatar" />
                <div className="topic">
                  <div className="title">
                    {
                      v.url
                      ? <span><a href={v.url} target="_blank">[转]{v.title}</a>
                        {
                          v.url
                            ? <span style={{ fontSize: 14, fontStyle: 'italic' }}>&nbsp;&nbsp;{new URL(v.url).hostname}</span>
                            : null
                        }
                      </span>
                      : <Link to={'/topic/' + v.id}>{v.title}</Link>
                    }
                  </div>
                  <div className="topic-info">
                    <span><Link to={"/topic/" + v.id}>{v.commentCount}/{v.view}</Link></span>&nbsp;•&nbsp;
                        <span className="tab">{tab}</span>&nbsp;•&nbsp;
                        <span><Link to={'/user/' + v.user.username}>{v.user.username}</Link></span>&nbsp;•&nbsp;
                        <span>{moment(v.inTime).fromNow()}</span>
                  </div>
                </div>
              </li>
            )
          })
        }
      </div>
    )
  }
}

export default TopicList