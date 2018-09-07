export default (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_HEADER":
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