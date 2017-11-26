import * as ActionTypes from './actionTypes.js';
import AsyncAction from './asyncAction.js';
import { browserHistory } from 'react-router';
import axios from 'axios';

export function templateAsyncAction(csrfToken) {
  return dispatch => {
    dispatch(templateAsyncPostRequestAction());
    return axios.post(`/`, {
      _csrf: csrfToken
    })
    .then(response => {
      if (response.data.error) {
        dispatch(templateAsyncPostResponseErrorAction(response.data.error, response.headers[Constants.ResponseHeaderCsrfToken]));
      }
      else {
        dispatch(templateAsyncPostResponseSuccessAction(response.headers[Constants.ResponseHeaderCsrfToken]));
      }
    })
    .catch(error => {
      dispatch(templateAsyncPostResponseErrorAction(error));
    });
  };
}

function templateAsyncPostRequestAction() {
  return new AsyncAction(
    ActionTypes.TemplatePostRequest,
    ActionTypes.TemplatePostRequest,
    true, false
  );
}

function templateAsyncPostResponseSuccessAction(csrfToken) {
  return new AsyncAction(
    ActionTypes.TemplatePostResponseSuccess,
    ActionTypes.TemplatePostRequest,
    false, false, { csrfToken }
  );
}

function templateAsyncPostResponseErrorAction(error, csrfToken) {
  return new AsyncAction(
    ActionTypes.TemplatePostResponseError,
    ActionTypes.TemplatePostRequest,
    false, false, { error, csrfToken }
  );
}

export function templateSyncAction(data) {
  return {
    type: ActionTypes.TemplateSync,
    data
  };
}