export function updateHeader() {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_HEADER',
      payload: {
        username: localStorage.getItem("username")
      }
    })
  }
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: 'LOGOUT',
      payload: {
        enable_redirect: true,
        username: ''
      }
    })
  }
}