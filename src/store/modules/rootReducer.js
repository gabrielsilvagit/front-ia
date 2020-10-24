import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import app from './app/reducer';

export default combineReducers({
  app,
  auth,
  user,
});
