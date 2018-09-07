export default (state = {
  show: false,
  msg: '',
  timeout: 3000
}, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        ...state,
        show: action.payload.show,
        msg: action.payload.msg,
        timeout: action.payload.timeout
      }
    case "HIDE_TOAST":
      return {
        ...state,
        show: action.payload.show,
        msg: action.payload.msg
      }
    default:
      return state
  }
}