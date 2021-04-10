const initialState = {
  isLoading: false,
};

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'request/pending':
      return {
        ...state,
        isLoading: true,
      };
    case 'request/failed':
      return {
        ...state,
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

// Selectors
export const selectRequestStatus = (state) => state.request;
