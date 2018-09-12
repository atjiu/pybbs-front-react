export default (state = {
  currentTab: 'all',
  loading: true,
  pageNo: 1,
  hasMore: false,
  topics: [],
  scrollPosition: 0
}, action) => {
  switch (action.type) {
    case "SAVE_STATE":
      return {
        ...state,
        scrollPosition: action.payload.scrollPosition,
      }
    case "LOAD_MORE":
      return {
        ...state,
        loading: true,
        hasMore: false
      }
    case "CHANGE_TAB":
      return {
        ...state,
        currentTab: action.payload.currentTab,
        loading: true,
        hasMore: false,
        topics: [],
        pageNo: 1
      }
    case "LOAD_MORE_FINISH":
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