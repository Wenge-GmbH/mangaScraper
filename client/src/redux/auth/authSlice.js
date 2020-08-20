import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// export default (state = {}, action) => {
//   switch (action.type) {
//     case AUTH_USER:
//       return { ...state, error: '', authenticated: true };
//     case UNAUTH_USER:
//       return { ...state, error: '', authenticated: false };
//     case AUTH_ERROR:
//       return { ...state, error: action.payload };

//     default:
//       return state;
//   }
// };

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    authUser: (state) => {
      axios.defaults.headers.common['Authorization'] = window.localStorage.getItem(
        'token'
      );
      return { ...state, error: '', authenticated: true };
    },
    unauthUser: (state) => {
      if (window.localStorage.getItem('token') !== null) {
        window.localStorage.removeItem('token');
      }
      return { ...state, error: '', authenticated: false };
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { authUser, unauthUser, authError } = actions;
export default reducer;
