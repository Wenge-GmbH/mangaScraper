import './scss/index.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { rootReducer as reducer } from './redux';
import MainRouter from './router';
import ScrollRestoration from './router/scrollRestoration';
import { AUTH_USER } from 'redux/types';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeReduxMiddlewares = () => {
  if (process.env.NODE_ENV === 'development') {
    return compose(reduxDevTools);
  } else {
    return compose();
    // return compose(applyMiddleware(reduxThunk));
  }
};

const store = createStore(reducer, composeReduxMiddlewares());

const token = localStorage.getItem('token');

// dispatch an action automatically if a JWT is stored in localStorage
if (token) {
  store.dispatch({ type: AUTH_USER });
  // add sth for status redirect
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollRestoration>
        <MainRouter />
      </ScrollRestoration>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
