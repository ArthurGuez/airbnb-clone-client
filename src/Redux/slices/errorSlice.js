const initialState = {
  description: '',
};

export const errorReducer = (state = initialState, action) => {
  if (action.type === 'error/setError') return { ...state, description: action.description };
  return state;
};

// Action creators
export function setError(error) {
  return {
    type: 'error/setError',
    description: error.response.data.description,
  };
}

// Selectors
export const selectError = (state) => state.error.description;
