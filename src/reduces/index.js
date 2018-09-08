import { combineReducers } from 'redux';

import toast from './toast';
import header from './header';

export default combineReducers({
  toast,
  header,
})