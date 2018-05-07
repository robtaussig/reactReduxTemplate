import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { createLogger } from "redux-logger";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/rootReducer.js';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const env = process.env.NODE_ENV || 'development';
let middleware;
if (env === 'production') {
  middleware = applyMiddleware(
    thunk
  );
} else {
  middleware = applyMiddleware(
    thunk,
    createLogger()
  );
}
const store = createStore(
  rootReducer,
  middleware
);

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider
    store={store}
    >
    {routes}
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
