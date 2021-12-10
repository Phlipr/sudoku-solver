import { generateInitialState } from "./board.utils";
import BoardActionTypes from "./board.types";

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
        default:
            return state;
    }
}

export default boxReducer;