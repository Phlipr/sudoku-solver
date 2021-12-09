import { generateInitialState } from "./box.utils";

const INITIAL_STATE = generateInitialState();

console.log("Initial state = ", INITIAL_STATE);

const boxReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default boxReducer;