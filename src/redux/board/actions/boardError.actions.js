import BoardErrorActionTypes from "../action-types/boardError.types";

export const addError = (error) => ({
    type: BoardErrorActionTypes.ADD_ERROR,
    error
});

export const clearError = (boxId) => ({
    type: BoardErrorActionTypes.CLEAR_ERROR,
    boxId
});

export const clearAllErrors = () => ({
    type: BoardErrorActionTypes.CLEAR_ALL_ERRORS,
});