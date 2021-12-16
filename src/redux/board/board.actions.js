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

export const resetBoard = () => ({
    type: BoardActionTypes.RESET_BOARD,
});

export const clearAllErrors = () => ({
    type: BoardActionTypes.CLEAR_ALL_ERRORS,
});

export const clearAllErrorsFromBox = boxId => ({
    type: BoardActionTypes.CLEAR_ALL_ERRORS_FROM_BOX,
    boxId
});

export const solvePuzzle = () => ({
    type: BoardActionTypes.SOLVE_PUZZLE
});

export const resetBoardToStart = () => ({
    type: BoardActionTypes.RESET_BOARD_TO_START
});

export const saveBoxAsInputted = boxId => ({
    type: BoardActionTypes.SAVE_BOX_AS_INPUTTED,
    boxId
});

export const boardStartSaved = () => ({
    type: BoardActionTypes.BOARD_START_SAVED
});

export const stopSolving = () => ({
    type: BoardActionTypes.STOP_SOLVING
});

export const unsolveBox = boxId => ({
    type: BoardActionTypes.UNSOLVE_BOX,
    boxId
});

export const saveBoardInputs = () => ({
    type: BoardActionTypes.SAVE_BOARD_INPUTS
});

export const increaseInputtedNumber = () => ({
    type: BoardActionTypes.INCREASE_INPUTTED_NUMBER
});

export const decreaseInputtedNumber = () => ({
    type: BoardActionTypes.DECREASE_INPUTTED_NUMBER
});