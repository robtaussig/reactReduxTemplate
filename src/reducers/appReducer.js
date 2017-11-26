import * as ActionTypes from '../actions/actionTypes.js';

const defaultState = {
  user: {}  
};

export function appReducer (state = defaultState, action) {
  let newState = {
    ...state
  };
  switch (action.type) {    
    default:
    
    break;
  }
  return newState;
}