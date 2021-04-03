import axios from 'axios';

const API = process.env.REACT_APP_API;

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
  isFetching: false,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'authentication/fetch':
      return {
        ...state,
        isFetching: true,
      };
    case 'authentication/login':
      localStorage.setItem('token', action.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        user: action.user,
        isFetching: false,
      };
    case 'authentication/logout':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isFetching: false,
      };
    case 'authentication/loadUser':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        isFetching: false,
      };
    case 'authentication/noUser':
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isFetching: false,
      };
    default:
      return state;
  }
};

// Action creators
export function fetch() {
  return {
    type: 'authentication/fetch',
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

// Thunk functions
export function fetchUser(email, password) {
  return async (dispatch) => {
    dispatch(fetch());
    try {
      const res = await axios.post(`${API}/signin`, {
        email,
        password,
      });
      if (res.status === 200) {
        dispatch(login(res.data));
      }
    } catch (error) {
      console.log('to do');
    }
  };
}

// Selectors
export const selectAuthStatus = (state) => state.authentication;
