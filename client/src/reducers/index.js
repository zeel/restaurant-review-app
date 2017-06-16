import {
	combineReducers
} from 'redux';
import {
	routerReducer
} from 'react-router-redux';

import user from './user';
import review from './review';
export default combineReducers({
	routerReducer,
	review,
	user,
});