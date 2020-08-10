import './scss/index.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { StaticDataProvider } from './config';

import { rootReducer as reducer } from './redux';
import MainRouter from './router';
import ScrollRestoration from './router/scrollRestoration';

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

ReactDOM.render(
  <BrowserRouter>
    <StaticDataProvider>
      <ScrollRestoration>
        <MainRouter />
      </ScrollRestoration>
    </StaticDataProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
