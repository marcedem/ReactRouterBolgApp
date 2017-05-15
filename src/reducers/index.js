import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostReducer from './reducer_posts';

const rootReducer = combineReducers({
	posts: PostReducer,
	form: formReducer //keyword "form:formReducer" is very important. See redux-form documentation
});

export default rootReducer;
