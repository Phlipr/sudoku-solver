import { generateInitialState } from "./board.utils";
import BoardActionTypes from "./board.types";

import { addErrorToBoard, removeErrorFromBoard, addConflictWithToBox } from "./board.utils";

const INITIAL_STATE = generateInitialState();

const boxReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}

export default boxReducer;