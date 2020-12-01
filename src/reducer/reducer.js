import { combineReducers } from 'redux';
import user from './userReducer';
import stories, {search, comments} from './storiesReducer';

export default combineReducers({
	user,
    stories,
    search,
    comments,
});
