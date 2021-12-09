import { combineReducers } from "redux";

import boxReducer from "./box/box.reducer";

const rootReducer = combineReducers({
    box: boxReducer
});

export default rootReducer;