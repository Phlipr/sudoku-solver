import BoardActionTypes from "../action-types/board.types";

export const resetBoard = () => ({
    type: BoardActionTypes.RESET_BOARD,
});

export const solvePuzzle = () => ({
    type: BoardActionTypes.SOLVE_PUZZLE
});

export const resetBoardToStart = () => ({
    type: BoardActionTypes.RESET_BOARD_TO_START
});

export const boardStartSaved = () => ({
    type: BoardActionTypes.BOARD_START_SAVED
});

export const stopSolving = () => ({
    type: BoardActionTypes.STOP_SOLVING
});

export const saveBoardInputs = () => ({
    type: BoardActionTypes.SAVE_BOARD_INPUTS
});