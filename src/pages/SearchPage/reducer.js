import {
  LOAD_SEARCH_DATA,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_DATA_ERROR,
  RESET_SERCH,
} from './constants';

const initialState = {
  searchResults: {
    loading: false,
    error: false,
    data: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SEARCH_DATA:
      return Object.assign({}, state, {
        searchResults: Object.assign({}, state.searchResults, {
          loading: true,
          error: false,
          data: [],
        }),
      });
    case LOAD_SEARCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        searchResults: Object.assign({}, state.searchResults, {
          loading: false,
          error: false,
          data: action.data,
        }),
      });
    case LOAD_SEARCH_DATA_ERROR:
      return Object.assign({}, state, {
        searchResults: Object.assign({}, state.searchResults, {
          loading: false,
          error: true,
          data: [],
        }),
      });
    case RESET_SERCH:
      return Object.assign({}, state, {
        searchResults: Object.assign({}, state.searchResults, {
          loading: false,
          error: false,
          data: [],
        }),
      });
    default:
      return state;
  }
};
