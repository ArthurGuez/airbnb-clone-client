import { fetchPlaces } from '../../api';
import { setError } from './errorSlice';
import { requestPending, requestFailed } from './requestSlice';

const initialState = [];

export const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'place/loadData':
      return action.payload;
    default:
      return state;
  }
};

// Action creators
export function loadData(data) {
  return {
    type: 'place/loadData',
    payload: data,
  };
}

// Thunk action creators
export function loadPlaces() {
  return async (dispatch) => {
    dispatch(requestPending());
    try {
      const res = await fetchPlaces();
      if (res.status === 200) {
        dispatch(loadData(res.data));
      }
    } catch (error) {
      dispatch(requestFailed());
      dispatch(setError(error));
    }
  };
}

// Selectors
export const selectData = (state) => state.place;
