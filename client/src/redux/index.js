import { combineReducers } from 'redux';

import userReducer from './user/userSlice';
import authReducer from './auth/authSlice';
import novelReducer from './novel/novelSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  novels: novelReducer,
});

export * from './types';
