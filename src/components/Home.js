import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TopicList from './TopicList';

class Home extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <section className="animated fadeIn">
        <TopicList/>
      </section>
    )
  }
}

export default connect((state) => {
  return { home: state.home }
})(withRouter(Home))