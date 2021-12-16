import { all, call, takeLatest, put, select, race, take } from "redux-saga/effects";

import BoardActionTypes from "./board.types";
import {
    addError,
    updateBoxValue,
    clearError,
    addErrorToBox,
    clearErrorFromBox,
    clearAllErrorsFromBox,
    addConflictToBox,
    clearFromHasConflicts,
    clearHasConflicts,
    saveBoxAsInputted,
    boardStartSaved,
    stopSolving,
    unsolveBox,
    solvePuzzle,
    decreaseInputtedNumber,
    increaseInputtedNumber
} from "./board.actions";
import {
    selectBoxes,
    selectBox,
    selectRowValues,
    selectColumnValues,
    selectSquareValues,
    selectSolving,
    selectBoxesInputted
} from "./board.selectors";

export function* clearConflicts(box) {
    const { boxId, hasConflictWith } = yield box;

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

    const valuesToCheck = Object.assign({}, rowValues, squareValues, columnValues);

    return valuesToCheck;
}

export function* checkForConflicts(valueToCheck, values, box) {

    const { row, column, boxId } = box;

    if (valueToCheck in values) {
        const boxCausingConflict = yield select(selectBox(values[valueToCheck]));

        const { row: rowConflict, column: columnConflict, boxId: boxIdConflict } = boxCausingConflict;

        yield put(addConflictToBox(boxId, boxIdConflict));
        yield put(addError({ boxId, errorMessage: `Box ${row}-${column} has the same value (${valueToCheck}) as box ${rowConflict}-${columnConflict}.` }));

        return true;
    }

    return false;
}

export function* makesUnsolvable(inputtedBox, inputtedValue) {
    const boxesArray = yield call(getBoxesArray);

    const { row: inputtedRow, column: inputtedColumn, square: inputtedSquare } = inputtedBox;

    for (let box of boxesArray) {
        if ((box.value !== 0 && box.value !== '') || box.boxId === inputtedBox.boxId) {
            continue;
        }
        let possibles = yield call(getPossibles, box);

        const { row, column, square } = box;

        if (row === inputtedRow || column === inputtedColumn || square === inputtedSquare) {
            possibles = possibles.filter(possible => possible.toString() !== inputtedValue.toString());
        }

        if (possibles.length === 0) {
            yield put(addConflictToBox(inputtedBox.boxId, box.boxId));
            yield put(addError({ boxId: inputtedBox.boxId, errorMessage: `Putting the value ${inputtedValue} in box ${inputtedRow}-${inputtedColumn} would make it impossible to solve box ${row}-${column}.` }))
            return true;
        }
    }

    return false;
}

export function* validateBoxValue({ boxId, value }) {
    const box = yield select(selectBox(boxId));

    if ((value >= 1 && value <= 9) || !value) {
        const valuesToCheck = yield call(getValuesToCheck, box);
        const foundConflict = yield call(checkForConflicts, value, valuesToCheck, box);
        if (foundConflict) return;

        const possiblesConflict = yield call(makesUnsolvable, box, value);

        if (possiblesConflict) return;

        yield put(clearError(boxId));
        yield put(clearErrorFromBox(boxId));
        yield call(clearConflicts, box);
        yield put(updateBoxValue(boxId, value));
        const boxesInputted = yield select(selectBoxesInputted);
        if (!value && boxesInputted > 0) {
            yield put(decreaseInputtedNumber());
        } else {
            yield put(increaseInputtedNumber());
        }

    } else {
        yield put(addError({ boxId, errorMessage: `The value '${value}' in the box ${box.row}-${box.column} is not allowed.  You must enter a number between 1 and 9.` }));
        yield put(addErrorToBox(boxId));
    }
}

export function* getBoxesArray() {
    const boxes = yield select(selectBoxes);

    return Object.values(boxes);
}

export function* clearAllErrorsFromBoxes() {
    const boxesArray = yield call(getBoxesArray);

    for (let box of boxesArray) {
        yield put(clearAllErrorsFromBox(box.boxId));
    }
}

export function* saveBoardStart() {

    const boxesArray = yield call(getBoxesArray);

    for (let box of boxesArray) {
        if (box.value !== 0 && box.value !== "") {
            yield put(saveBoxAsInputted(box.boxId));
        }
    }

    yield put(boardStartSaved());

    yield put(solvePuzzle());
}

export function* getPossibles(box) {
    const valuesToCheck = yield call(getValuesToCheck, box);

    const valuesTaken = Object.keys(valuesToCheck);

    let possibles = [];

    for (var i = 1; i < 10; i++) {
        if (!valuesTaken.includes(i.toString())) {
            possibles.push(i);
        }
    }

    return possibles;
}

export function* checkForGivens() {
    let givensFound = false;

    console.log("checking for givens...");

    const boxesArray = yield call(getBoxesArray);

    console.log("boxesArray = ", boxesArray);

    for (let box of boxesArray) {
        if (box.inputted || box.solved) {
            continue;
        }
        const possibles = yield call(getPossibles, box);
        console.log("possibles in checkForGivens = ", possibles);
    }

    if (givensFound) {
        yield call(checkForGivens);
    }
}

export function* resetBoardToInputtedStart() {
    console.log("resetting board to start...");
    yield put(stopSolving());

    const boxesArray = yield call(getBoxesArray);

    console.log("boxesArray = ", boxesArray);

    for (let box of boxesArray) {
        if (box.solved) {
            console.log("box ", box.boxId, " was solved.");
            yield put(updateBoxValue(box.boxId, 0));
            yield put(unsolveBox(box.boxId));
        }
    }
}

export function* cycleSolveLogic() {
    yield call(checkForGivens);
}

export function* onValidateBoxValue() {
    yield takeLatest(BoardActionTypes.VALIDATE_BOX_VALUE, validateBoxValue);
}

export function* onClearAllErrors() {
    yield takeLatest(BoardActionTypes.CLEAR_ALL_ERRORS, clearAllErrorsFromBoxes);
}

export function* onSaveBoardInputs() {
    yield takeLatest(BoardActionTypes.SAVE_BOARD_INPUTS, saveBoardStart);
}

export function* onResetBoardToStart() {
    yield takeLatest(BoardActionTypes.RESET_BOARD_TO_START, resetBoardToInputtedStart);
}

export function* onSolvePuzzle() {
    while (true) {
        yield take(BoardActionTypes.SOLVE_PUZZLE);
        yield race({
            task: call(cycleSolveLogic),
            cancel: take(BoardActionTypes.STOP_SOLVING)
        });
    }
}

export function* boardSagas() {
    yield all([call(onValidateBoxValue), call(onClearAllErrors), call(onSaveBoardInputs), call(onResetBoardToStart), call(onSolvePuzzle)]);
}