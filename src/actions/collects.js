import Axios from '../js/axios';
import {showToast} from './toast';

export function saveState(scrollPosition) {
  return function (dispatch) {
    dispatch({
      type: 'COLLECT_SAVE_STATE',
      payload: {
        scrollPosition: scrollPosition
      }
    })
  }
}

export function loadMore(username, pageNo) {
  return function (dispatch) {
    dispatch({
      type: 'COLLECT_LOAD_MORE',
    });
    fetchData(username, pageNo, dispatch);
  }
}

function fetchData(username, pageNo, dispatch) {
  Axios.get('/user/' + username + '/collects', {
    params: {
      pageNo: pageNo
    }
  }).then(({ data }) => {
    if (data.code === 200) {
      let topics = data.detail.content.map(v => {
        let topic = v.topic;
        topic.user = v.user;
        return topic;
      });
      dispatch({
        type: "COLLECT_LOAD_MORE_FINISH",
        payload: {
          hasMore: !data.detail.last,
          pageNo: pageNo + 1,
          topics: topics,
        }
      })
    } else {
      dispatch(showToast(data.description))
    }
  }).catch(err => dispatch(showToast(err.toString())))
}

