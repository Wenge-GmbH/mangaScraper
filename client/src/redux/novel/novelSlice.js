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
      console.log(data);
      return data;
    },
    fetchSingleNovel: (state, { payload }) => {
      // if (!state[payload.slug] || !state[payload.slug].chapters) {
      state[payload.slug] = payload;
      //   return;
      // }

      // const { chapters, ...data } = payload;
      // state[payload.slug] = { ...state[payload.slug], ...data };
      // chapters.forEach((chapter) => {
      //   state[payload.slug].chapters[chapter.chapter] = {
      //     ...state[payload.slug].chapters[chapter.chapter],
      //     ...chapter,
      //   };
      // });
    },
    // fetchChapter: (state, action) => {
    //   state[payload.slug].chapters[chapter.chapter];
    //   return;
    // },
  },
});
export const { fetchNovels, fetchSingleNovel, fetchChapter } = actions;
export default reducer;
