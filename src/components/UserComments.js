import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState, loadMore } from '../actions/comments';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import TopicList from './TopicList';
import InfiniteScroll from 'react-infinite-scroller';

class UserComments extends Component {
  componentDidMount() {
    if (this.props.comments.topics.length === 0 || this.props.comments.loading) {
      this.loadMore();
    }
    document.documentElement.scrollTop = this.props.comments.scrollPosition;
  }
  componentWillUnmount() {
    this.props.dispatch(saveState(document.documentElement.scrollTop));
  }
  loadMore() {
    this.props.dispatch(loadMore(this.props.comments.username, this.props.comments.pageNo));
  }
  render() { 
    return (
      <section className="animated bounce">
        <div className="topic-list">
          <div>
            <ul>
              {
                this.props.comments.topics.length === 0 && !this.props.comments.loading
                  ? <span>这里什么都没有...</span>
                  : null
              }
              <InfiniteScroll
                pageStart={1}
                hasMore={this.props.comments.hasMore}
                loader={<Loading key={1}/>}
                loadMore={this.loadMore.bind(this)}>
                <TopicList topics={this.props.comments.topics}/>
              </InfiniteScroll>
            </ul>
            {
              this.props.comments.loading
                ? <Loading />
                : null
            }
            {
              !this.props.comments.hasMore && !this.props.comments.loading
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
  return { comments: state.comments }
})(withRouter(UserComments))