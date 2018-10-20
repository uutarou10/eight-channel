import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import post from './post';
import thread from './thread';

export default combineReducers({
  auth,
  common,
  thread,
  post
});
