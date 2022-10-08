import BoxErrorActionTypes from "./boxError.types";

const BoxActionTypes = {
    UPDATE_BOX_VALUE: "UPDATE_BOX_VALUE",
    VALIDATE_BOX_VALUE: "VALIDATE_BOX_VALUE",
    SAVE_BOX_AS_INPUTTED: "SAVE_BOX_AS_INPUTTED",
    BOX_SOLVED: "BOX_SOLVED",
    UNSOLVE_BOX: "UNSOLVE_BOX",

    ...BoxErrorActionTypes
};

export default BoxActionTypes;