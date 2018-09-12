import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState, loadMore, changeTab } from '../actions/topic_list';
import { withRouter, Link } from 'react-router-dom';
import Loading from './Loading';
import moment from 'moment';
import 'moment/locale/zh-cn';
import DefaultAvatar from '../imgs/default-avatar.jpg';
import InfiniteScroll from 'react-infinite-scroller';

class TopicList extends Component {
  componentDidMount() {
    if (this.props.topic_list.topics.length === 0 || this.props.topic_list.loading) {
      this.props.dispatch(loadMore(this.props.topic_list.currentTab, this.props.topic_list.pageNo));
    }
    document.documentElement.scrollTop = this.props.topic_list.scrollPosition;
  }
  componentWillUnmount() {
    this.props.dispatch(saveState(document.documentElement.scrollTop));
  }
  loadMore() {
    this.props.dispatch(loadMore(this.props.topic_list.currentTab, this.props.topic_list.pageNo));
  }
  changeTabFetchData(tab) {
    this.props.dispatch(changeTab(tab));
  }
  render() {
    return (
      <div className="topic-list">
        <div className="tabs">
          <div className={this.props.topic_list.currentTab === 'all' ? 'active' : null} onClick={() => this.changeTabFetchData('all')}>全部</div>
          <div className={this.props.topic_list.currentTab === 'share' ? 'active' : null} onClick={() => this.changeTabFetchData('share')}>分享</div>
          <div className={this.props.topic_list.currentTab === 'ask' ? 'active' : null} onClick={() => this.changeTabFetchData('ask')}>问答</div>
          <div className={this.props.topic_list.currentTab === 'blog' ? 'active' : null} onClick={() => this.changeTabFetchData('blog')}>博客</div>
          <div className={this.props.topic_list.currentTab === 'job' ? 'active' : null} onClick={() => this.changeTabFetchData('job')}>招聘</div>
        </div>
        <div>
          <ul ref="scroll">
            {
              this.props.topic_list.topics.length === 0 && !this.props.topic_list.loading
                ? <span>这里什么都没有...</span>
                : null
            }
            <InfiniteScroll
              pageStart={1}
              hasMore={this.props.topic_list.hasMore}
              loader={<Loading key={1}/>}
              loadMore={this.loadMore.bind(this)}>
              {
                this.props.topic_list.topics.map(function (v, i) {
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
            </InfiniteScroll>
          </ul>
          {
            this.props.topic_list.loading
              ? <Loading />
              : null
          }
          {
            !this.props.topic_list.hasMore && !this.props.topic_list.loading
              ? <div>没有更多数据了...</div>
              : null
          }
        </div>
      </div>
    )
  }
}

export default connect((state) => {
  return { topic_list: state.topic_list }
})(withRouter(TopicList))