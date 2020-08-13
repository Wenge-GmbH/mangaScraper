import { FETCH_NOVELS } from 'redux/types';

function map(arr, propToMap) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    result[el[propToMap]] = arr[i];
  }
  return result;
}

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_NOVELS:
      const data = map(action.payload, '_id');
      return { ...state, ...data };
    default:
      return state;
  }
};
