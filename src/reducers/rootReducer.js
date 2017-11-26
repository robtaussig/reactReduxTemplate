import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { appReducer } from './appReducer.js';
import { errorReducer } from './errorReducer.js';

export const rootReducer = combineReducers({
  app: appReducer,
  errors: errorReducer,
  routing: routerReducer
});