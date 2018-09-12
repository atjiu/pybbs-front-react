import { combineReducers } from 'redux';

import toast from './toast';
import header from './header';
import topic_list from './topic_list';
import collects from './collects';
import topics from './topics';
import comments from './comments';

export default combineReducers({
  toast,
  header,
  topic_list,
  collects,
  topics,
  comments,
})