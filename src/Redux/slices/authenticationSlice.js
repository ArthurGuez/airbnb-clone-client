import { loginUser } from '../../api';
import { setError } from './errorSlice';
import { requestPending, requestFailed } from './requestSlice';

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'authentication/login':
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
      };
    case 'authentication/logout':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    case 'authentication/loadUser':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
      };
    case 'authentication/noUser':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

// Action creators
export function login(payload) {
  return {
    type: 'authentication/login',
    token: payload.token,
    user: payload.user,
  };
}

export function logout() {
  return {
    type: 'authentication/logout',
  };
}

export function loadUser(token) {
  return {
    type: 'authentication/loadUser',
    payload: token,
  };
}

export function noUser() {
  return {
    type: 'authentication/noUser',
  };
}

// Thunk action creators
export function fetchUser(email, password, history) {
  return async (dispatch) => {
    dispatch(requestPending());
    try {
      const res = await loginUser(email, password);
      if (res.status === 200) {
        dispatch(login(res.data));
        history.push('/');
      }
    } catch (error) {
      dispatch(requestFailed());
      dispatch(setError(error));
    }
  };
}

// Selectors
export const selectAuthStatus = (state) => state.authentication;
