import {userConstants} from '../constants';

const initialState={
    status: false,
    message: "Error",
    data: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case userConstants.USER_CREATE_SUCCESS:
            // console.log('Redux'+ JSON.stringify(action))
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                data: action.payload.data
            };
        case userConstants.USER_CREATE_ERROR:
            return {
                ...state,
                status: false,
                message: action.payload,
                data: null
            };

        case userConstants.USER_LIST_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                data: action.payload.data
            };
        case userConstants.USER_LIST_ERROR:
            return {
                ...state,
                status: false,
                message: action.payload,
                data: null
            };

        case userConstants.USER_UPDATE_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                data: action.payload.data
            };
        case userConstants.USER_UPDATE_ERROR:
            return {
                ...state,
                status: false,
                message: action.payload,
                data: null
            };

        case userConstants.USER_DELETE_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                data: action.payload.data
            };
        case userConstants.USER_DELETE_ERROR:
            return {
                ...state,
                status: false,
                message: action.payload,
                data: null
            };

        case userConstants.USER_CHART_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                data: action.payload.data
            };
        case userConstants.USER_CHART_ERROR:
            return {
                ...state,
                status: false,
                message: action.payload,
                data: null
            };

        default:
            return state
    }
};
