import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authenticationReducer } from './slices/authenticationSlice';
import { errorReducer } from './slices/errorSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  combineReducers({
    authentication: authenticationReducer,
    error: errorReducer,
  }),
  applyMiddleware(thunk)
);
