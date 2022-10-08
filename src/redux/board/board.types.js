import BoardErrorActionTypes from "./action-types/boardError.types";
import BoardStatActionTypes from "./action-types/boardStat.types";
import BoxActionTypes from "./action-types/box.types";

const BoardActionTypes = {
    RESET_BOARD: "RESET_BOARD",
    RESET_BOARD_TO_START: "RESET_BOARD_TO_START",
    SOLVE_PUZZLE: "SOLVE_PUZZLE",
    BOARD_START_SAVED: "BOARD_START_SAVED",
    STOP_SOLVING: "STOP_SOLVING",
    SAVE_BOARD_INPUTS: "SAVE_BOARD_INPUTS",

    ...BoardErrorActionTypes,
    ...BoardStatActionTypes,

    ...BoxActionTypes
};

export default BoardActionTypes;