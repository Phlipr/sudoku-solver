import BoxErrorActionTypes from "../action-types/boxError.types";

export const addErrorToBox = (boxId) => ({
    type: BoxErrorActionTypes.ADD_ERROR_TO_BOX,
    boxId
});

export const clearErrorFromBox = (boxId) => ({
    type: BoxErrorActionTypes.CLEAR_ERROR_FROM_BOX,
    boxId
});

export const addConflictToBox = (boxIdWithConflict, boxIdCausingConflict) => ({
    type: BoxErrorActionTypes.ADD_CONFLICT_TO_BOX,
    boxIdWithConflict,
    boxIdCausingConflict
});

export const clearHasConflicts = (boxId) => ({
    type: BoxErrorActionTypes.CLEAR_HAS_CONFLICTS,
    boxId
});

export const clearFromHasConflicts = (boxIdWithConflict, boxIdToClear) => ({
    type: BoxErrorActionTypes.CLEAR_FROM_HAS_CONFLICTS,
    boxIdWithConflict,
    boxIdToClear
});

export const clearAllErrorsFromBox = boxId => ({
    type: BoxErrorActionTypes.CLEAR_ALL_ERRORS_FROM_BOX,
    boxId
});