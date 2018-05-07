import {
  TemplatePostRequest,
  TemplatePostResponseSuccess,
  TemplatePostResponseError,
  TemplateSync,
} from './actionTypes.js';
import AsyncAction from './asyncAction.js';
import SyncAction from './syncAction.js';
import { browserHistory } from 'react-router';
import axios from 'axios';

export function templateAsyncAction() {
  return dispatch => {
    dispatch(templateAsyncPostRequestAction());
    return axios.post(`/`, {
      
    })
    .then(response => {
      if (response.data.error) {
        dispatch(templateAsyncPostResponseErrorAction(response.data.error));
      }
      else {
        dispatch(templateAsyncPostResponseSuccessAction());
      }
    })
    .catch(error => {
      dispatch(templateAsyncPostResponseErrorAction(error));
    });
  };
}

function templateAsyncPostRequestAction() {
  return new AsyncAction(
    TemplatePostRequest,
    TemplatePostRequest,
    true, false
  );
}

function templateAsyncPostResponseSuccessAction() {
  return new AsyncAction(
    TemplatePostResponseSuccess,
    TemplatePostRequest,
    false, false, {}
  );
}

function templateAsyncPostResponseErrorAction(error) {
  return new AsyncAction(
    TemplatePostResponseError,
    TemplatePostRequest,
    false, false, { error }
  );
}

export function templateSyncAction(data) {
  return new SyncAction(
    TemplateSync,
    { data }
  );
}