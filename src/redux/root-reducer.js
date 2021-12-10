import { combineReducers } from "redux";

import boardReducer from "./board/board.reducer";

const rootReducer = combineReducers({
    board: boardReducer
});

export default rootReducer;