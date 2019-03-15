import {
  LOAD_STOCK_PRICE,
  LOAD_STOCK_PRICE_SUCCESS,
  LOAD_STOCK_PRICE_ERROR,
  SET_SELECTED_PERIOD,
} from './constants';

export const setPeriod = val => dispatch => {
  dispatch({
    type: SET_SELECTED_PERIOD,
    val,
  });
};
export const loadStockPrice = (stockquote, period) => dispatch => {
  dispatch({
    type: LOAD_STOCK_PRICE,
  });
  fetch(`https://api.iextrading.com/1.0/stock/${stockquote}/chart/${period}`)
    .then(response => {
      if (response.status !== 200) {
        dispatch({
          type: LOAD_STOCK_PRICE_ERROR,
        });
        return;
      }

      const res = response.json();
      res.then(data => {
        dispatch({
          type: LOAD_STOCK_PRICE_SUCCESS,
          data,
        });
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_STOCK_PRICE_ERROR,
      });
    });
};
