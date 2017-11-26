import * as ActionTypes from './actionTypes.js';
import { browserHistory } from 'react-router';

export function setFormErrorAction(error, errorCode) {
  return {
    type: ActionTypes.SetFormError,
    error, errorCode
  };
}

export function resetFormErrorAction() {
  return {
    type: ActionTypes.ResetFormError
  };
}

export function setModalErrorAction(error, errorCode) {
  return {
    type: ActionTypes.SetModalError,
    error, errorCode
  };
}

export function resetModalErrorAction() {
  return {
    type: ActionTypes.ResetModalError
  };
}

export function setErrorMessageAction(error, errorCode) {
  return {
    type: ActionTypes.SetError,
    error, errorCode
  };
}

export function resetErrorMessageAction() {
  return {
    type: ActionTypes.ResetError
  };
}