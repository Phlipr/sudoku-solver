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

export function* validateBoxValue({ boxId, value }) {
    const box = yield select(selectBox(boxId));

    const rowValues = yield select(selectRowValues(box.row));
    console.log("rowValues = ", rowValues);
    const squareValues = yield select(selectSquareValues(box.square));
    console.log("squareValues = ", squareValues);
    const columnValues = yield select(selectColumnValues(box.column));
    console.log("columnValues = ", columnValues);

    if (value in rowValues) {
        const boxCausingConflict = yield select(selectBox(rowValues[value]));
        yield put(addConflictToBox(boxId, rowValues[value]));
        yield put(addError({ boxId, errorMessage: `The value '${value}' in the box in row ${box.row} and column ${box.column} has already been placed in the box in row ${boxCausingConflict.row} and column ${boxCausingConflict.column}.` }));
        return;
    }

    if (value in columnValues) {
        const boxCausingConflict = yield select(selectBox(columnValues[value]));
        yield put(addConflictToBox(boxId, columnValues[value]));
        yield put(addError({ boxId, errorMessage: `The value '${value}' in the box in row ${box.row} and column ${box.column} has already been placed in the box in row ${boxCausingConflict.row} and column ${boxCausingConflict.column}.` }));
        return;
    }

    if (value in squareValues) {
        const boxCausingConflict = yield select(selectBox(squareValues[value]));
        yield put(addConflictToBox(boxId, squareValues[value]));
        yield put(addError({ boxId, errorMessage: `The value '${value}' in the box in row ${box.row} and column ${box.column} has already been placed in the box in row ${boxCausingConflict.row} and column ${boxCausingConflict.column}.` }));
        return;
    }

    if ((value >= 1 && value <= 9) || !value) {
        yield put(clearError(boxId));
        yield put(clearErrorFromBox(boxId));
        yield call(clearConflicts, box);
        yield put(updateBoxValue(boxId, value));

    } else {
        yield put(addError({ boxId, errorMessage: `The value '${value}' in the box in row ${box.row} and column ${box.column} is not allowed.  You must enter a number between 1 and 9.` }));
        yield put(addErrorToBox(boxId));
    }
}

export function* onValidateBoxValue() {
    yield takeLatest(BoardActionTypes.VALIDATE_BOX_VALUE, validateBoxValue);
}

export function* boardSagas() {
    yield all([call(onValidateBoxValue)]);
}