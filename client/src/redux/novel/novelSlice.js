import { createSlice } from '@reduxjs/toolkit';

function map(arr, propToMap) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    result[el[propToMap]] = arr[i];
  }
  return result;
}

// export default (state = {}, action) => {
//   switch (action.type) {
//     case FETCH_NOVELS:
//       const data = map(action.payload, '_id');
//       return { ...state, ...data };
//     default:
//       return state;
//   }
// };

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    // authUser: (state, action) => ,
    fetchNovels: (state, action) => {
      const data = map(action.payload, 'slug');
      return data;
    },
    fetchSingleNovel: (state, { payload }) => {
      state[payload.slug] = payload;
    },
  },
});
export const { fetchNovels, fetchSingleNovel } = actions;
export default reducer;
