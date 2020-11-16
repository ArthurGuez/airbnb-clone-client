const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.data.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.data.token,
        isFetching: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        isFetching: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        isFetching: false,
      };
    case 'NO_USER':
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

module.exports = reducer;
