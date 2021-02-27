import { createAsyncThunk, createNextState, createSlice } from '@reduxjs/toolkit';
import * as MangaService from 'services/manga-service';

export const searchManga = createAsyncThunk(
  'serach/manga',
  async (options, thunkAPI) => {
    const res = await MangaService.search(options);
    return res;
  }
);

const { actions, reducer } = createSlice({
  name: 'search',
  initialState: { active: false, pending: false, manga: null, history: [] },
  reducers: {
    // authUser: (state, action) => ,
    setActive: (state, { payload }) => {
      state.active = payload;
    },
  },
  extraReducers: {
    [searchManga.pending]: (state) => {
      state.pending = true;
    },
    [searchManga.fulfilled]: (state, action) => {
      state.pending = false;
      state.manga = action.payload;
    },
  },
});
export const { setActive } = actions;
export default reducer;
