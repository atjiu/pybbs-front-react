export default (state = {
  enable_redirect: false,
  redirect_url: '/',
  username: localStorage.getItem("username")
}, action) => {
  switch (action.type) {
    case "UPDATE_HEADER":
      return {
        ...state,
        username: action.payload.username
      }
    case "LOGOUT":
      return {
        ...state,
        enable_redirect: action.payload.enable_redirect,
        username: action.payload.username
      }
    default:
      return state
  }
}