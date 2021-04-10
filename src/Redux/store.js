import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authenticationReducer } from './slices/authenticationSlice';
import { placeReducer } from './slices/placeSlice';
import { errorReducer } from './slices/errorSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore(
  combineReducers({
    authentication: authenticationReducer,
    place: placeReducer,
    error: errorReducer,
  }),
  applyMiddleware(thunk)
);
