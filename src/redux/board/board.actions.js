import BoardActionTypes from "./board.types";

export const updateBoxValue = (boxId, value) => ({
    type: BoardActionTypes.UPDATE_BOX_VALUE,
    boxId,
    value
});