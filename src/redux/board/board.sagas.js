import { all, call, takeLatest, put, select } from "redux-saga/effects";

import BoardActionTypes from "./board.types";
import { addError, updateBoxValue, clearError, addErrorToBox, clearErrorFromBox, addConflictToBox, clearFromHasConflicts, clearHasConflicts } from "./board.actions";
import { selectBox, selectRowValues, selectColumnValues, selectSquareValues } from "./board.selectors";

export function* clearConflicts(box) {
    const { boxId, hasConflictWith } = yield box;

    console.log("triggered clearConflicts...");
    console.log("boxId = ", boxId);
    console.log("hasConflictWith = ", hasConflictWith);

    for (let boxIdWithConflict of hasConflictWith) {
        yield put(clearFromHasConflicts(boxIdWithConflict, boxId));
    }

    yield put(clearHasConflicts(boxId));
}

export function* getValuesToCheck(box) {
    const { row, square, column } = box;

    const rowValues = yield select(selectRowValues(row));
    const squareValues = yield select(selectSquareValues(square));
    const columnValues = yield select(selectColumnValues(column));

    console.log("rowValues = ", rowValues);
    console.log("squareValues = ", squareValues);
    console.log("columnValues = ", columnValues);

    const valuesToCheck = Object.assign({}, rowValues, squareValues, columnValues);

    console.log("valuesToCheck = ", valuesToCheck);

    return valuesToCheck;
}

export function* checkForConflicts(valueToCheck, values, box) {
    console.log("valueToCheck = ", valueToCheck);
    console.log("values = ", values);
    console.log("box = ", box);

    const { row, column, boxId } = box;

    console.log("row = ", row);
    console.log("column = ", column);
    console.log("boxId = ", boxId);

    if (valueToCheck in values) {
        const boxCausingConflict = yield select(selectBox(values[valueToCheck]));

        console.log("boxCausingConflict = ", boxCausingConflict);

        const { row: rowConflict, column: columnConflict, boxId: boxIdConflict } = boxCausingConflict;

        console.log("rowConflict = ", rowConflict);
        console.log("columnConflict = ", columnConflict);
        console.log("boxIdConflict = ", boxIdConflict);

        yield put(addConflictToBox(boxId, boxIdConflict));
        yield put(addError({ boxId, errorMessage: `Box ${row}-${column} has the same value (${valueToCheck}) as box ${rowConflict}-${columnConflict}.` }))

        return true;
    }

    return false;
}

export function* validateBoxValue({ boxId, value }) {
    const box = yield select(selectBox(boxId));

    const valuesToCheck = yield call(getValuesToCheck, box);

    const foundConflict = yield call(checkForConflicts, value, valuesToCheck, box);

    if (foundConflict) return;

    if ((value >= 1 && value <= 9) || !value) {
        yield put(clearError(boxId));
        yield put(clearErrorFromBox(boxId));
        yield call(clearConflicts, box);
        yield put(updateBoxValue(boxId, value));

    } else {
        yield put(addError({ boxId, errorMessage: `The value '${value}' in the box ${box.row}-${box.column} is not allowed.  You must enter a number between 1 and 9.` }));
        yield put(addErrorToBox(boxId));
    }
}

export function* onValidateBoxValue() {
    yield takeLatest(BoardActionTypes.VALIDATE_BOX_VALUE, validateBoxValue);
}

export function* boardSagas() {
    yield all([call(onValidateBoxValue)]);
}