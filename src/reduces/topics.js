export default (state = {
  username: localStorage.getItem("username"),
  loading: true,
  pageNo: 1,
  hasMore: false,
  topics: [],
  scrollPosition: 0
}, action) => {
  switch (action.type) {
    case "TOPICS_SAVE_STATE":
      return {
        ...state,
        scrollPosition: action.payload.scrollPosition,
      }
    case "TOPICS_LOAD_MORE":
      return {
        ...state,
        loading: true,
        hasMore: false
      }
    case "TOPICS_LOAD_MORE_FINISH":
      return {
        ...state,
        loading: false,
        hasMore: action.payload.hasMore,
        pageNo: state.pageNo + 1,
        topics: state.topics.concat(action.payload.topics),
      }
    default:
      return state
  }
}