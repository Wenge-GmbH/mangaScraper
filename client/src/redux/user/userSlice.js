import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    // authUser: (state, action) => ,
    fetchUser: (state, action) => action.payload,
  },
});
export const { authUser, fetchUser } = actions;
export default reducer;
