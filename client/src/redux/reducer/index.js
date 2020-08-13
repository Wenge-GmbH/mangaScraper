import { combineReducers } from 'redux';

import userReducer from './user-reducer';
import authReducer from './auth-reducer';
import novelReducer from './novel-reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  novels: novelReducer,
});
