import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showToast } from '../actions/toast';
import { withRouter, Link } from 'react-router-dom';
import DefaultAvatar from '../imgs/default-avatar.jpg';
import Axios from '../js/axios';
import Loading from './Loading';
import moment from 'moment';
import 'moment/locale/zh-cn';

class Top100 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    }
  }
  componentWillMount() {
    Axios.get('/top100')
      .then(({ data }) => {
        if(data.code === 200) {
          this.setState({
            loading: false,
            users: data.detail
          })
        } else {
          this.props.dispatch(showToast(data.desctiption));
        }
      }).catch(err => this.props.dispatch(showToast(err.toString())))
  }
  render() {
    return (
      <section className="animated fadeIn score-list">
        <table border="0">
          <caption><h3>TOP100</h3></caption>
          <tbody>
            {
              this.state.users.length > 0
              ? this.state.users.map(function(v, i) {
                return (
                  <tr key={i}>
                    <td><img src={v.avatar ? v.avatar : DefaultAvatar} className="avatar" alt="avatar" /></td>
                    <td><Link to={'/user/' + v.username}>{v.username}</Link></td>
                    <td>{v.email}</td>
                    <td>{v.website}</td>
                    <td>{moment(v.inTime).fromNow()}</td>
                    <td>{v.score}</td>
                  </tr>
                )
              })
              : <Loading/>
            }
          </tbody>
        </table>
      </section>
    )
  }
}

export default connect((state) => {
  return { }
})(withRouter(Top100))