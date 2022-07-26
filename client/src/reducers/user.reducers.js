import {userConstants} from '../constants';

export default (state = {}, action) => {
    switch (action.type) {

        case userConstants.USER_CREATE:
            return {
                ...state
            };

        case userConstants.USER_LIST:
            return {
                ...state
            };

        case userConstants.USER_UPDATE:
            return {
                ...state
            };

        case userConstants.USER_DELETE:
            return {
                ...state
            };

        default:
            return state
    }
};
