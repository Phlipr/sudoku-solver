import BoxActionTypes from "../action-types/box.types";

export const updateBoxValue = (boxId, value) => ({
    type: BoxActionTypes.UPDATE_BOX_VALUE,
    boxId,
    value
});

export const validateBoxValue = (boxId, value) => ({
    type: BoxActionTypes.VALIDATE_BOX_VALUE,
    boxId,
    value
});

export const saveBoxAsInputted = boxId => ({
    type: BoxActionTypes.SAVE_BOX_AS_INPUTTED,
    boxId
});

export const unsolveBox = boxId => ({
    type: BoxActionTypes.UNSOLVE_BOX,
    boxId
});

export const boxSolved = (boxId, value) => ({
    type: BoxActionTypes.BOX_SOLVED,
    boxId,
    value
});