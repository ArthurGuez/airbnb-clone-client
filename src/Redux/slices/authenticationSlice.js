import { loginUser } from '../../api';
import { setError } from './errorSlice';

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
  isLoading: false,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'authentication/requestPending':
      return {
        ...state,
        isLoading: true,
      };
    case 'authentication/requestFailed':
      return {
        ...state,
        isLoading: false,
      };
    case 'authentication/login':
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        isLoading: false,
      };
    case 'authentication/logout':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isLoading: false,
      };
    case 'authentication/loadUser':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isLoading: false,
      };
    case 'authentication/noUser':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Action creators
export function requestPending() {
  return {
    type: 'authentication/requestPending',
  };
}

export function requestFailed() {
  return {
    type: 'authentication/requestFailed',
  };
}

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
