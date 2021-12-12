import BoardActionTypes from "./board.types";

export const updateBoxValue = (boxId, value) => ({
    type: BoardActionTypes.UPDATE_BOX_VALUE,
    boxId,
    value
});

export const validateBoxValue = (boxId, value) => ({
    type: BoardActionTypes.VALIDATE_BOX_VALUE,
    boxId,
    value
});

export const addErrorToBox = (boxId) => ({
    type: BoardActionTypes.ADD_ERROR_TO_BOX,
    boxId
});

export const clearErrorFromBox = (boxId) => ({
    type: BoardActionTypes.CLEAR_ERROR_FROM_BOX,
    boxId
});

export const addError = (error) => ({
    type: BoardActionTypes.ADD_ERROR,
    error
});

export const clearError = (boxId) => ({
    type: BoardActionTypes.CLEAR_ERROR,
    boxId
});

export const addConflictToBox = (boxIdWithConflict, boxIdCausingConflict) => ({
    type: BoardActionTypes.ADD_CONFLICT_TO_BOX,
    boxIdWithConflict,
    boxIdCausingConflict
});

export const clearHasConflicts = (boxId) => ({
    type: BoardActionTypes.CLEAR_HAS_CONFLICTS,
    boxId
});

export const clearFromHasConflicts = (boxIdWithConflict, boxIdToClear) => ({
    type: BoardActionTypes.CLEAR_FROM_HAS_CONFLICTS,
    boxIdWithConflict,
    boxIdToClear
});