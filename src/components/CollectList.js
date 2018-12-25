import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveState, loadMore } from '../actions/collects';
import { withRouter } from 'react-router-dom';
import Loading from './Loading';
import TopicList from './TopicList';
import InfiniteScroll from 'react-infinite-scroller';

class CollectList extends Component {
  componentDidMount() {
    if (this.props.collects.topics.length === 0 || this.props.collects.loading) {
      this.loadMore();
    }
    document.documentElement.scrollTop = this.props.collects.scrollPosition;
  }
  componentWillUnmount() {
    this.props.dispatch(saveState(document.documentElement.scrollTop));
  }
  loadMore() {
    this.props.dispatch(loadMore(this.props.collects.username, this.props.collects.pageNo));
  }
  render() {
    return (
      <section className="animated fadeIn">
        <div className="topic-list">
          <div>
            <ul>
              {
                this.props.collects.topics.length === 0 && !this.props.collects.loading
                  ? <span>这里什么都没有...</span>
                  : null
              }
              <InfiniteScroll
                pageStart={1}
                hasMore={this.props.collects.hasMore}
                loader={<Loading key={1}/>}
                loadMore={this.loadMore.bind(this)}>
                <TopicList topics={this.props.collects.topics}/>
              </InfiniteScroll>
            </ul>
            {
              this.props.collects.loading
                ? <Loading />
                : null
            }
            {
              !this.props.collects.hasMore && !this.props.collects.loading
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
  return { collects: state.collects }
})(withRouter(CollectList))