import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_STORIES:
      return {
        ...state,
        loading: false,
        stories: action.payload,
      };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload };
    case HANDLE_PAGE:
      if (action.payload === 'increase') {
        return {
          ...state,
          page: state.page < 49 ? state.page + 1 : 0,
        };
      } else {
        return {
          ...state,
          page: state.page > 0 ? state.page - 1 : 49,
        };
      }
    case REMOVE_STORY:
      const newStories = state.stories.filter(
        (story) => story.objectID !== action.payload
      );
      return { ...state, stories: newStories };
    default:
      break;
  }
};
export default reducer;
