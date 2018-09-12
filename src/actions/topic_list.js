import Axios from '../js/axios';
import {showToast} from './toast';

export function saveState(scrollPosition) {
  return function (dispatch) {
    dispatch({
      type: 'SAVE_STATE',
      payload: {
        scrollPosition: scrollPosition
      }
    })
  }
}

export function changeTab(tab) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_TAB',
      payload: {
        currentTab: tab
      }
    });
    fetchData(tab, 1, dispatch);
  }
}

export function loadMore(tab, pageNo) {
  return function (dispatch) {
    dispatch({
      type: 'LOAD_MORE',
    });
    fetchData(tab, pageNo, dispatch);
  }
}

function fetchData(tab, pageNo, dispatch) {
  Axios.get('/', {
    params: {
      tab: tab === 'all' ? '' : tab,
      pageNo: pageNo
    }
  }).then(({ data }) => {
    if (data.code === 200) {
      dispatch({
        type: "LOAD_MORE_FINISH",
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

