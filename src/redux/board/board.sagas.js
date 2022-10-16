import { all, call, takeLatest, put, select, race, take } from "redux-saga/effects";

import BoardActionTypes from "./action-types/board.types";
import BoardErrorActionTypes from "./action-types/boardError.types";
import BoxActionTypes from "./action-types/box.types";
import {
    boardStartSaved,
    stopSolving,
    solvePuzzle
} from "./actions/board.actions";
import {
    updateBoxValue,
    saveBoxAsInputted,
    unsolveBox,
    boxSolved
} from "./actions/box.actions"
import {
    addErrorToBox,
    clearErrorFromBox,
    clearAllErrorsFromBox,
    addConflictToBox,
    clearFromHasConflicts,
    clearHasConflicts,
} from "./actions/boxError.actions"
import {
    addError,
    clearError,
} from "./actions/boardError.actions"
import {
    decreaseInputtedNumber,
    increaseInputtedNumber,
    decreaseSolvedNumber,
    increaseLogicRounds,
    increaseCheckForGivensRounds,
    addBoxToCheckForGivensArray,
    increaseSolvedNumber,
    increaseSlicingRounds,
    addBoxToSlicedArray
} from "./actions/boardStat.actions"
import {
    selectBoxes,
    selectBox,
    selectRowValues,
    selectColumnValues,
    selectSquareValues,
    selectBoxesInputted,
    selectCheckForGivensRounds,
    selectSlicingRounds
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

export function* handleConflict(inputtedBox, conflictedBox, inputtedValue) {
    const { boxId: inputtedBoxId, row: inputtedRow, column: inputtedColumn } = inputtedBox;
    const { boxId: conflictedBoxId, row, column } = conflictedBox;

    yield put(addConflictToBox(inputtedBoxId, conflictedBoxId));
    yield put(addError({
        boxId: inputtedBoxId,
        errorMessage: `Putting the value ${inputtedValue} in box ${inputtedRow}-${inputtedColumn} would make it impossible to solve box ${row}-${column}.`
    }));
}

export function* makesUnsolvable(inputtedBox, inputtedValue) {
    const boxesArray = yield call(getBoxesArray);

    const { row: inputtedRow, column: inputtedColumn, square: inputtedSquare } = inputtedBox;

    let rowPossibles = {};
    let columnPossibles = {};
    let squarePossibles = {};

    for (var i = 1; i < 10; i++) {
        rowPossibles[i] = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
        columnPossibles[i] = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
        squarePossibles[i] = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
    }

    /** This block of code does two things;
     *  1.) It determines if adding the inputtedValue to the inputtedBox will make it such that any of the boxes it affects
     *      will not have any possible values.  If that is the case, this will make the puzzle unsolvable and a conflict
     *      is added to the board.
     *  2.) It builds the three objects initialized above.  These possible objects will be used to check for another type
     *      of conflict in which a single box is the only possible place for multiple values, which makes the board
     *      unsolvable.
     */
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
            yield call(handleConflict, inputtedBox, box, inputtedValue);
            return true;
        } else {
            for (let possible of possibles) {
                rowPossibles[box.row][possible].push(box.boxId);
                squarePossibles[box.square][possible].push(box.boxId);
                columnPossibles[box.column][possible].push(box.boxId);
            }
        }
    }

    /** This block follows this logic:
     *  If a possible value can only be placed in a single box within a row, column, or square, and another possible
     *  can only be placed in that same box, then the inputted value would make this board unsolvable.
     */
    for (var j = 1; j < 10; j++) {
        let currRow = rowPossibles[j];
        let currColumn = columnPossibles[j];
        let currSquare = squarePossibles[j];

        const rowSet = new Set();
        const columnSet = new Set();
        const squareSet = new Set();

        for (var k = 1; k < 10; k++) {
            if (currRow[k].length === 1) {
                if (rowSet.has(currRow[k][0])) {
                    const conflictedBox = yield select(selectBox(currRow[k][0]));
                    yield call(handleConflict, inputtedBox, conflictedBox, inputtedValue);
                    return true;
                } else {
                    rowSet.add(currRow[k][0]);
                }
            }

            if (currColumn[k].length === 1) {
                if (columnSet.has(currColumn[k][0])) {
                    const conflictedBox = yield select(selectBox(currColumn[k][0]));
                    yield call(handleConflict, inputtedBox, conflictedBox, inputtedValue);
                    return true;
                } else {
                    columnSet.add(currColumn[k][0]);
                }
            }

            if (currSquare[k].length === 1) {
                if (squareSet.has(currSquare[k][0])) {
                    const conflictedBox = yield select(selectBox(currSquare[k][0]));
                    yield call(handleConflict, inputtedBox, conflictedBox, inputtedValue);
                    return true;
                } else {
                    squareSet.add(currSquare[k][0]);
                }
            }
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

export function* solvedBox(boxId, value) {
    yield put(boxSolved(boxId, value));
    yield put(increaseSolvedNumber());
}

export function* checkForGivens() {
    yield put(increaseCheckForGivensRounds());
    let givensFound = false;

    const boxesArray = yield call(getBoxesArray);

    for (let box of boxesArray) {
        if (box.inputted || box.solved) {
            continue;
        }
        const possibles = yield call(getPossibles, box);
        if (possibles.length === 1) {
            const currGivensRounds = yield select(selectCheckForGivensRounds);
            let given = `${box.row}-${box.column}(${currGivensRounds})`;
            yield put(addBoxToCheckForGivensArray(given));
            givensFound = true;
            yield call(solvedBox, box.boxId, possibles[0]);
        }
    }

    if (givensFound) {
        yield call(checkForGivens);
    }
}

export function* foundSlice(boxId, value) {
    const currSliceRounds = yield select(selectSlicingRounds);

    const box = yield select(selectBox(boxId));

    let sliced = `${box.row}-${box.column}(${currSliceRounds})`;

    yield put(addBoxToSlicedArray(sliced));

    yield call(solvedBox, box.boxId, value);
}

export function* slicePuzzle() {
    yield put(increaseSlicingRounds());
    let slicesSuccessful = false;

    const boxesArray = yield call(getBoxesArray);

    let rowPossibles = {};
    let columnPossibles = {};
    let squarePossibles = {};

    for (var i = 1; i < 10; i++) {
        rowPossibles[i] = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
        columnPossibles[i] = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
        squarePossibles[i] = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };
    }

    for (let box of boxesArray) {
        if (box.inputted || box.solved) {
            continue;
        }

        const possibles = yield call(getPossibles, box);

        for (let possible of possibles) {
            rowPossibles[box.row][possible].push(box.boxId);
            squarePossibles[box.square][possible].push(box.boxId);
            columnPossibles[box.column][possible].push(box.boxId);
        }
    }

    for (var j = 1; j < 10; j++) {
        if (slicesSuccessful) break;

        let currRow = rowPossibles[j];
        let currColumn = columnPossibles[j];
        let currSquare = squarePossibles[j];

        for (var k = 1; k < 10; k++) {
            if (currRow[k].length === 1) {
                yield call(foundSlice, currRow[k], k);
                slicesSuccessful = true;
                break;
            }

            if (currColumn[k].length === 1) {
                yield call(foundSlice, currColumn[k], k);
                slicesSuccessful = true;
                break;
            }

            if (currSquare[k].length === 1) {
                yield call(foundSlice, currSquare[k], k);
                slicesSuccessful = true;
                break;
            }
        }
    }

    if (slicesSuccessful) {
        yield call(slicePuzzle);
    }
}

export function* resetBoardToInputtedStart() {
    yield put(stopSolving());

    const boxesArray = yield call(getBoxesArray);

    for (let box of boxesArray) {
        if (box.solved) {
            yield put(updateBoxValue(box.boxId, 0));
            yield put(unsolveBox(box.boxId));
            yield put(decreaseSolvedNumber(box.boxId));
        }
    }
}

export function* cycleSolveLogic() {
    yield put(increaseLogicRounds());
    yield call(checkForGivens);
    yield call(slicePuzzle);
}

export function* onValidateBoxValue() {
    yield takeLatest(BoxActionTypes.VALIDATE_BOX_VALUE, validateBoxValue);
}

export function* onClearAllErrors() {
    yield takeLatest(BoardErrorActionTypes.CLEAR_ALL_ERRORS, clearAllErrorsFromBoxes);
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