export function showToast(msg, timeout) {
  return function (dispatch) {
    dispatch({
      type: 'SHOW_TOAST',
      payload: {
        show: true,
        msg: msg,
        timeout: timeout
      }
    });
    setTimeout(() => {
      dispatch({
        type: 'HIDE_TOAST',
        payload: {
          show: false,
          msg: ""
        } 
      })
    }, timeout || 3000)
  }
}

export function hideToast() {
  return function (dispatch) {
    dispatch({
      type: 'HIDE_TOAST',
      payload: {
        show: false,
        msg: ""
      }
    })
  }
}