import Axios from '../js/axios';
import {showToast} from './toast';

export function saveState(scrollPosition) {
  return function (dispatch) {
    dispatch({
      type: 'TOPICS_SAVE_STATE',
      payload: {
        scrollPosition: scrollPosition
      }
    })
  }
}

export function loadMore(username, pageNo) {
  return function (dispatch) {
    dispatch({
      type: 'TOPICS_LOAD_MORE',
    });
    fetchData(username, pageNo, dispatch);
  }
}

function fetchData(username, pageNo, dispatch) {
  Axios.get('/user/' + username + '/topics', {
    params: {
      pageNo: pageNo
    }
  }).then(({ data }) => {
    if (data.code === 200) {
      dispatch({
        type: "TOPICS_LOAD_MORE_FINISH",
        payload: {
          hasMore: !data.detail.last,
          pageNo: pageNo + 1,
          topics: data.detail.content,
        }
      })
    } else {
      dispatch(showToast(data.description))
    }
  }).catch(err => dispatch(showToast(err.toString())))
}

