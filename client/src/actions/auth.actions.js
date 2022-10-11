import {authConstants} from '../constants';
import AuthDataService from "../services/auth.service";

export const loginUser = (data) => async (dispatch) => {
    try {
        const res = await AuthDataService.login(data);
        let result=res.data
        //console.log('result=' + JSON.stringify(result));

        if (result.status){
            return dispatch({type: authConstants.AUTHENTICATED, payload: result});
        }
        else{
            return dispatch({type: authConstants.NOT_AUTHENTICATED, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: authConstants.NOT_AUTHENTICATED, payload: err.message});
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        const res = await AuthDataService.logout()
        let result=res.data
        //console.log('result=' + JSON.stringify(result));

        if (result.status){
            return dispatch({type: authConstants.NOT_AUTHENTICATED, payload: result});
        }
        else{
            return dispatch({type: authConstants.NOT_AUTHENTICATED, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: authConstants.NOT_AUTHENTICATED, payload: err.message});
    }
};