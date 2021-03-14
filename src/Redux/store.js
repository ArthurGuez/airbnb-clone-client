import { createStore, combineReducers } from 'redux';
import { authenticationReducer } from './slices/authenticationSlice';

export const store = createStore(
  combineReducers({
    authentication: authenticationReducer,
  })
);
