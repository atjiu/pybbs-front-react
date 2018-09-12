import { combineReducers } from 'redux';

import toast from './toast';
import header from './header';
import topic_list from './topic_list';

export default combineReducers({
  toast,
  header,
  topic_list,
})