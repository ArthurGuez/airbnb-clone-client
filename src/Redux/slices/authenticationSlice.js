const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null,
  isFetching: true,
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'authentication/login':
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
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

export function login(token) {
  return {
    type: 'authentication/login',
    payload: token,
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

export const selectAuthStatus = (state) => state.authentication;
