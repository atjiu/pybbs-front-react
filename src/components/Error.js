import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotMatch extends Component {
  render() {
    return (
      <section className="animated bounce">
          秘密基地被你发现了，可惜这里什么都没有... <Link to="/">去首页</Link>刷帖吧!
      </section>
    );
  }
}

export default NotMatch;