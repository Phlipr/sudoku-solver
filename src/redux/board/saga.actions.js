import SagaActionTypes from "./saga.action-types";

export const solvePuzzle = () => ({
    type: SagaActionTypes.SOLVE_PUZZLE
});

export const saveBoardInputs = () => ({
    type: SagaActionTypes.SAVE_BOARD_INPUTS
});

export const validateBoxValue = (boxId, value) => ({
    type: SagaActionTypes.VALIDATE_BOX_VALUE,
    boxId,
    value
});