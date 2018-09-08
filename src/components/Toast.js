import React, { Component } from 'react';

import { connect } from 'react-redux';
import { hideToast } from '../actions/toast';
import { withRouter } from 'react-router-dom';

class Toast extends Component {
  render() {
    return (
      <div>
        {this.props.toast.show ? <div className="toast animated bounceRight">{this.props.toast.msg}</div> : null}
      </div>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.dispatch(hideToast());
    }, this.props.toast.timeout)
  }
}

export default connect((state) => {
  return { toast: state.toast }
})(withRouter(Toast))