import { combineReducers } from 'redux';

import userReducer from './user/userSlice';
import authReducer from './auth/authSlice';
import novelReducer from './novel/novelSlice';
import searchReducer from './search/searchSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  novels: novelReducer,
  search: searchReducer,
});

export * from './types';
