import {applyMiddleware, createStore} from 'redux';

import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

import reduce from './reduces';

const middleware = applyMiddleware(thunk, createLogger());

export default createStore(
  reduce, 
  // process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null,
  middleware,
);