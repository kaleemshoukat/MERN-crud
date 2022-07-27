import {userConstants} from '../constants';
import UserDataService from "../services/user.service";

export const createUser = (data) => async (dispatch) => {
    try {
        const res = await UserDataService.create(data);
        let result=res.data

        return dispatch({...result, type: userConstants.USER_CREATE});
    } catch (err) {
        return dispatch({status: false, message: err.message, type: userConstants.USER_CREATE});
    }
};

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const res = await UserDataService.update(id, data);
        let result=res.data

        return dispatch({...result, type: userConstants.USER_UPDATE});
    } catch (err) {
        return dispatch({status: false, message: err.message, type: userConstants.USER_UPDATE});
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await UserDataService.delete(id);
        let result=res.data

        return dispatch({...result, type: userConstants.USER_DELETE});
    } catch (err) {
        return dispatch({status: false, message: err.message, type: userConstants.USER_DELETE});
    }
};

export const getAllUser = (itemsPerPage, itemOffset) => async (dispatch) => {
    try {
        const res = await UserDataService.getAll(itemsPerPage, itemOffset);
        let result=res.data

        return dispatch({...result, type: userConstants.USER_LIST});
    } catch (err) {
        return dispatch({status: false, message: err.message, type: userConstants.USER_LIST});
    }
};

export const chartUser = () => async (dispatch) => {
    try {
        const res = await UserDataService.chart();
        let result=res.data

        return dispatch({...result, type: userConstants.USER_CHART});
    } catch (err) {
        return dispatch({status: false, message: err.message, type: userConstants.USER_CHART});
    }
};