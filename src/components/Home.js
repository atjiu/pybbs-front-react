import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TopicList from './TopicList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'all',
    }
  }

  render() {
    return (
      <section className="animated bounce">
        <TopicList ref="topicList"/>
      </section>
    )
  }
}

export default connect((state) => {
  return { home: state.home }
})(withRouter(Home))