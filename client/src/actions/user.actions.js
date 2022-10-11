import {userConstants} from '../constants';
import UserDataService from "../services/user.service";

export const createUser = (data) => async (dispatch) => {
    try {
        const res = await UserDataService.create(data);
        let result=res.data

        if (result.status){
            return dispatch({type: userConstants.USER_CREATE_SUCCESS, payload: result});
        }
        else{
            return dispatch({type: userConstants.USER_CREATE_ERROR, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: userConstants.USER_CREATE_ERROR, payload: err.message});
    }
};

export const updateUser = (id, data) => async (dispatch) => {
    try {
        const res = await UserDataService.update(id, data);
        let result=res.data

        if (result.status){
            return dispatch({type: userConstants.USER_UPDATE_SUCCESS, payload: result});
        }
        else{
            return dispatch({type: userConstants.USER_UPDATE_ERROR, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: userConstants.USER_UPDATE_ERROR, payload: err.message});
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        const res = await UserDataService.delete(id);
        let result=res.data

        if (result.status){
            return dispatch({type: userConstants.USER_DELETE_SUCCESS, payload: result});
        }
        else{
            return dispatch({type: userConstants.USER_DELETE_ERROR, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: userConstants.USER_DELETE_ERROR, payload: err.message});
    }
};

export const getAllUser = (itemsPerPage, itemOffset) => async (dispatch) => {
    try {
        const res = await UserDataService.getAll(itemsPerPage, itemOffset);
        let result=res.data

        if (result.status){
            return dispatch({type: userConstants.USER_LIST_SUCCESS, payload: result});
        }
        else{
            return dispatch({type: userConstants.USER_LIST_ERROR, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: userConstants.USER_LIST_ERROR, payload: err.message});
    }
};

export const chartUser = () => async (dispatch) => {
    try {
        const res = await UserDataService.chart();
        let result=res.data

        if (result.status){
            return dispatch({type: userConstants.USER_CHART_SUCCESS, payload: result});
        }
        else{
            return dispatch({type: userConstants.USER_CHART_ERROR, payload: result.message});
        }
    } catch (err) {
        return dispatch({type: userConstants.USER_CHART_ERROR, payload: err.message});
    }
};