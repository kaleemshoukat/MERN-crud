import {authConstants} from '../constants';

const initialState={
    status: false,
    message: "Error",
    data: null
}

export default (state = initialState, action) => {

    switch (action.type) {
        case authConstants.AUTHENTICATED:
            console.log('action',action)
            // sessionStorage.setItem('token', action.payload.data.user.token);
            return  {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                data: action.payload.data,
                isLoggedIn: true,
                token: action.payload.data.user.token
            }

        case authConstants.NOT_AUTHENTICATED:
            return {
                ...state,
                status: false,
                message: action.payload,
                data: null,
                isLoggedIn: false,
                token: ''
            };

        default:
            return state
    }
};
