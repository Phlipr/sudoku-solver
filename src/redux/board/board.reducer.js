import { generateInitialState } from "./board.utils";
import BoardActionTypes from "./board.types";

import {
    addErrorToBoard,
    removeErrorFromBoard,
    addConflictWithToBox,
    addBoxToCheckForGivensArray
} from "./board.utils";

const INITIAL_STATE = generateInitialState();

const boxReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BoardActionTypes.RESET_BOARD:
            return {
                ...INITIAL_STATE
            }
        case BoardActionTypes.UPDATE_BOX_VALUE:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        value: action.value
                    }
                }
            }
        case BoardActionTypes.ADD_ERROR:
            return {
                ...state,
                errors: addErrorToBoard(state.errors, action.error)
            }
        case BoardActionTypes.CLEAR_ERROR:
            return {
                ...state,
                errors: removeErrorFromBoard(state.errors, action.boxId)
            }
        case BoardActionTypes.ADD_ERROR_TO_BOX:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        hasError: true
                    }
                }
            }
        case BoardActionTypes.CLEAR_ALL_ERRORS:
            return {
                ...state,
                errors: {}
            }
        case BoardActionTypes.CLEAR_ALL_ERRORS_FROM_BOX:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        hasConflict: false,
                        hasError: false,
                        hasConflictWith: []
                    }
                }
            }
        case BoardActionTypes.CLEAR_ERROR_FROM_BOX:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        hasError: false
                    }
                }
            }
        case BoardActionTypes.ADD_CONFLICT_TO_BOX:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxIdWithConflict]: {
                        ...state.boxes[action.boxIdWithConflict],
                        hasConflict: true,
                        hasConflictWith: addConflictWithToBox(state.boxes[action.boxIdWithConflict].hasConflictWith, action.boxIdCausingConflict)
                    },
                    [action.boxIdCausingConflict]: {
                        ...state.boxes[action.boxIdCausingConflict],
                        hasConflict: true,
                        hasConflictWith: addConflictWithToBox(state.boxes[action.boxIdCausingConflict].hasConflictWith, action.boxIdWithConflict)
                    }
                }
            }
        case BoardActionTypes.CLEAR_FROM_HAS_CONFLICTS:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxIdWithConflict]: {
                        ...state.boxes[action.boxIdWithConflict],
                        hasConflictWith: state.boxes[action.boxIdWithConflict].hasConflictWith.filter(boxId => {
                            console.log("current boxId = ", boxId);
                            console.log("boxIdToClear = ", action.boxIdToClear);
                            return boxId !== action.boxIdToClear
                        })
                    }
                }
            }
        case BoardActionTypes.CLEAR_HAS_CONFLICTS:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        hasConflictWith: []
                    }
                }
            }
        case BoardActionTypes.BOARD_START_SAVED:
            return {
                ...state,
                solving: true
            }
        case BoardActionTypes.STOP_SOLVING:
            return {
                ...state,
                solving: false
            }
        case BoardActionTypes.SAVE_BOX_AS_INPUTTED:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        inputted: true,
                    }

                }
            }
        case BoardActionTypes.UNSOLVE_BOX:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        solved: false
                    }
                }
            }
        case BoardActionTypes.INCREASE_INPUTTED_NUMBER:
            return {
                ...state,
                boxesInputted: state.boxesInputted + 1
            }
        case BoardActionTypes.DECREASE_INPUTTED_NUMBER:
            return {
                ...state,
                boxesInputted: state.boxesInputted - 1
            }
        case BoardActionTypes.INCREASE_SOLVED_NUMBER:
            return {
                ...state,
                boxesSolved: state.boxesSolved + 1
            }
        case BoardActionTypes.DECREASE_SOLVED_NUMBER:
            return {
                ...state,
                boxesSolved: state.boxesSolved - 1
            }
        case BoardActionTypes.RESET_BOARD_TO_START:
            return {
                ...state,
                logicRounds: 0,
                checkForGivensRounds: 0,
                checkForGivensArray: []
            }
        case BoardActionTypes.INCREASE_LOGIC_ROUNDS:
            return {
                ...state,
                logicRounds: state.logicRounds + 1
            }
        case BoardActionTypes.INCREASE_CHECK_FOR_GIVENS_ROUNDS:
            return {
                ...state,
                checkForGivensRounds: state.checkForGivensRounds + 1
            }
        case BoardActionTypes.ADD_BOX_TO_CHECK_FOR_GIVENS_ARRAY:
            return {
                ...state,
                checkForGivensArray: addBoxToCheckForGivensArray(state.checkForGivensArray, action.given)
            }
        case BoardActionTypes.BOX_SOLVED:
            return {
                ...state,
                boxes: {
                    ...state.boxes,
                    [action.boxId]: {
                        ...state.boxes[action.boxId],
                        solved: true,
                        value: action.value,
                        possibles: []
                    }
                }
            }
        default:
            return state;
    }
}

export default boxReducer;