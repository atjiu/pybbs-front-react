import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(showToast('123123', 3000));
  }

  render() {
    return (
      <section className="animated bounce">
          123123
      </section>
    )
  }
}

export default connect((state) => {
  return { home: state.home }
})(withRouter(Home))