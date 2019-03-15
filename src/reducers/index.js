import { combineReducers } from 'redux';
import searchReducer from 'pages/SearchPage/reducer';
import stockReducer from 'pages/StockPage/reducer';

export default combineReducers({
  searchReducer,
  stockReducer,
});
