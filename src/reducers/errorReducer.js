import * as ActionTypes from '../actions/actionTypes.js';

const defaultState = {
  history: [],
  formError: false,
  modalError: false,
  errorMessage: false
};

export function errorReducer (state = defaultState, action) {
  let newState = {
    ...state
  };
  switch (action.type) {

    case ActionTypes.SetFormError:
      newState.formError = action.error;
      newState.history.push({
        error: action.error,
        errorCode: action.errorCode
      });
    break;

    case ActionTypes.ResetFormError:
      newState.formError = false;
    break;    

    case ActionTypes.SetModalError:
      newState.modalError = action.error;
      newState.history.push({
        error: action.error,
        errorCode: action.errorCode
      });
    break;

    case ActionTypes.ResetModalError:
      newState.modalError = false;
    break; 

    case ActionTypes.SetErrorMessage:
      newState.errorMessage = action.error;
      newState.history.push({
        error: action.error,
        errorCode: action.errorCode
      });
    break;

    case ActionTypes.ResetErrorMessage:
      newState.errorMessage = false;
    break; 

    default:

    break;
    
  }
  return newState;
}