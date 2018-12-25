import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState, loadMore } from '../actions/topics';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import TopicList from './TopicList';
import InfiniteScroll from 'react-infinite-scroller';

class UserTopics extends Component {
  componentDidMount() {
    if (this.props.topics.topics.length === 0 || this.props.topics.loading) {
      this.loadMore();
    }
    document.documentElement.scrollTop = this.props.topics.scrollPosition;
  }
  componentWillUnmount() {
    this.props.dispatch(saveState(document.documentElement.scrollTop));
  }
  loadMore() {
    this.props.dispatch(loadMore(this.props.topics.username, this.props.topics.pageNo));
  }
  render() {
    return (
      <section className="animated fadeIn">
        <div className="topic-list">
          <div>
            <ul>
              {
                this.props.topics.topics.length === 0 && !this.props.topics.loading
                  ? <span>这里什么都没有...</span>
                  : null
              }
              <InfiniteScroll
                pageStart={1}
                hasMore={this.props.topics.hasMore}
                loader={<Loading key={1}/>}
                loadMore={this.loadMore.bind(this)}>
                <TopicList topics={this.props.topics.topics}/>
              </InfiniteScroll>
            </ul>
            {
              this.props.topics.loading
                ? <Loading />
                : null
            }
            {
              !this.props.topics.hasMore && !this.props.topics.loading
                ? <div>没有更多数据了...</div>
                : null
            }
          </div>
        </div>
      </section>
    );
  }
}

export default connect((state) => {
  return { topics: state.topics }
})(withRouter(UserTopics))