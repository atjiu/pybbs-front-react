import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotMatch extends Component {
  render() {
    return (
      <section className="animated fadeIn">
          页面失踪了... <Link to="/">去首页</Link>刷帖吧!
      </section>
    );
  }
}

export default NotMatch;