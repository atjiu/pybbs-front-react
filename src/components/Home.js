import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState, loadMore, changeTab } from '../actions/topic_list';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import TopicList from './TopicList';
import InfiniteScroll from 'react-infinite-scroller';

class Home extends Component {

  componentDidMount() {
    if (this.props.topic_list.topics.length === 0 || this.props.topic_list.loading) {
      this.loadMore();
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
      <section className="animated bounce">
        <div className="topic-list">
          <div className="tabs">
            <div className={this.props.topic_list.currentTab === 'all' ? 'active' : null} onClick={() => this.changeTabFetchData('all')}>全部</div>
            <div className={this.props.topic_list.currentTab === 'share' ? 'active' : null} onClick={() => this.changeTabFetchData('share')}>分享</div>
            <div className={this.props.topic_list.currentTab === 'ask' ? 'active' : null} onClick={() => this.changeTabFetchData('ask')}>问答</div>
            <div className={this.props.topic_list.currentTab === 'blog' ? 'active' : null} onClick={() => this.changeTabFetchData('blog')}>博客</div>
            <div className={this.props.topic_list.currentTab === 'job' ? 'active' : null} onClick={() => this.changeTabFetchData('job')}>招聘</div>
          </div>
          <div>
            <ul>
              <InfiniteScroll
                pageStart={1}
                hasMore={this.props.topic_list.hasMore}
                loader={<Loading key={1}/>}
                loadMore={this.loadMore.bind(this)}>
                <TopicList topics={this.props.topic_list.topics}/>
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
      </section>
    )
  }
}

export default connect((state) => {
  return { topic_list: state.topic_list }
})(withRouter(Home))