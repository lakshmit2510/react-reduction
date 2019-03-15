import {
  LOAD_SEARCH_DATA,
  LOAD_SEARCH_DATA_SUCCESS,
  LOAD_SEARCH_DATA_ERROR,
  RESET_SERCH,
} from './constants';

export const resetSearch = () => dispatch => {
  dispatch({
    type: RESET_SERCH,
  });
};

export const searchAction = inputquote => dispatch => {
  dispatch({
    type: LOAD_SEARCH_DATA,
  });
  fetch(`https://api.iextrading.com/1.0/stock/${inputquote}/peers`)
    .then(response => {
      if (response.status !== 200) {
        dispatch({
          type: LOAD_SEARCH_DATA_ERROR,
        });
        return;
      }

      const res = response.json();
      res.then(data => {
        dispatch({
          type: LOAD_SEARCH_DATA_SUCCESS,
          data,
        });
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_SEARCH_DATA_ERROR,
      });
    });
};
