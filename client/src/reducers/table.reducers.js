import {tableConstants} from '../constants';

const initialState={
    queryPageIndex: 0,
    queryPageSize: 10,
    totalCount: null,
    searchValue: null,
}

export default (state= initialState, action) => {

    switch (action.type) {
        case tableConstants.PAGE_CHANGED:
            return {
                ...state,
                queryPageIndex: action.payload,
            };
        case tableConstants.PAGE_SIZE_CHANGED:
            return {
                ...state,
                queryPageSize: action.payload,
            };
        case tableConstants.TOTAL_COUNT_CHANGED:
            return {
                ...state,
                totalCount: action.payload,
            };
        case tableConstants.SEARCH_VALUE_CHANGED:
            return {
                ...state,
                searchValue: action.payload,
            };
        default:
            return state;
    }
};
