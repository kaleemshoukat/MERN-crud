import {combineReducers} from 'redux';
import user from './user.reducers';
import auth from './auth.reducers';
import table from './table.reducers';

export default combineReducers({
    user,
    auth,
    table
});