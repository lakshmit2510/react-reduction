import {
  LOAD_STOCK_PRICE,
  LOAD_STOCK_PRICE_SUCCESS,
  LOAD_STOCK_PRICE_ERROR,
  SET_SELECTED_PERIOD,
} from './constants';

const initialState = {
  stockPrice: {
    loading: false,
    error: false,
    data: [],
  },
  selectedPeriod: '1m',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STOCK_PRICE:
      return Object.assign({}, state, {
        stockPrice: Object.assign({}, state.stockPrice, {
          loading: true,
          error: false,
          data: [],
        }),
      });
    case LOAD_STOCK_PRICE_SUCCESS:
      return Object.assign({}, state, {
        stockPrice: Object.assign({}, state.stockPrice, {
          loading: false,
          error: false,
          data: action.data,
        }),
      });
    case LOAD_STOCK_PRICE_ERROR:
      return Object.assign({}, state, {
        stockPrice: Object.assign({}, state.stockPrice, {
          loading: false,
          error: true,
          data: [],
        }),
      });
    case SET_SELECTED_PERIOD:
      return Object.assign({}, state, {
        selectedPeriod: action.val,
      });
    default:
      return state;
  }
};
