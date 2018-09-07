import React, { Component } from 'react';

class TopicDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <section className="animated bounce">
      {this.props.match.params.id}
      </section>
    );
  }
}
 
export default TopicDetail;