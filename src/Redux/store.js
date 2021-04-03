import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authenticationReducer } from './slices/authenticationSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  combineReducers({
    authentication: authenticationReducer,
  }),
  applyMiddleware(thunk)
);
