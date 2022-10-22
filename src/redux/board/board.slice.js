import { createSlice } from "@reduxjs/toolkit";

import { generateInitialState, addErrorToBoard, removeErrorFromBoard } from "./board.utils";

const INITIAL_STATE = generateInitialState();

const boardSlice = createSlice({
    name: 'board',
    INITIAL_STATE,
    reducers: {
        // actions related to resetting board
        resetBoard(state) {
            state = INITIAL_STATE;
        },
        resetBoardToStart(state) {
            state.logicRounds = 0;
            state.checkForGivensRounds = 0;
            state.checkForGivensArray = [];
            state.slicingRounds = 0;
            state.slicingArray = [];
        },
        // actions related to error state of board
        addErrorToBoard(state, action) {
            state.errors = addErrorToBoard(state.errors, action.payload);
        },
        clearErrorFromBoard(state, action) {
            state.errors = removeErrorFromBoard(state.errors, action.payload);
        },
        clearAllErrors(state) {
            state.errors = {};
        },
        // actions related to solving state of board
        boardStartSaved(state) {
            state.solving = true;
        },
        stopSolving(state) {
            state.solving = false;
        },
        // actions related to board stats
        increaseInputtedNumber(state) {
            state.boxesInputted++;
        },
        decreaseInputtedNumber(state) {
            state.boxesInputted--;
        },
        increaseSolvedNumber(state) {
            state.boxesSolved++;
        },
        decreaseSolvedNumber(state) {
            state.boxesSolved--;
        },
        increaseLogicRounds(state) {
            state.logicRounds++;
        },
        increaseCheckForGivensRounds(state) {
            state.checkForGivensRounds++;
        },
        addBoxToCheckForGivensArray(state, action) {
            state.checkForGivensArray.push(action.payload);
        },
        increaseSlicingRounds(state) {
            state.slicingRounds++;
        },
        addBoxToSlicingArray(state, action) {
            state.slicingArray.push(action.payload);
        },
        //actions related to updating box state
        updateBoxValue: {
            reducer(state, action) {
                const { boxId, value } = action.payload;
                state.boxes[boxId].value = value;
            },
            prepare(boxId, value) {
                return {
                    boxId,
                    value
                };
            }
        },
        addErrorToBox(state, action) {
            state.boxes[action.payload].hasError = true
        },
        clearAllErrorsFromBox(state, action) {
            state.boxes[action.payload] = {
                ...state.boxes[action.payload],
                hasConflict: false,
                hasError: false,
                hasConflictWith: []
            };
        },
        clearErrorFromBox(state, action) {
            state.boxes[action.payload].hasError = false;
        },
        addConflictToBox: {
            reducer(state, action) {
                const { boxIdWithConflict, boxIdCausingConflict } = action.payload;
                state.boxes[boxIdWithConflict].hasConflict = true;
                state.boxes[boxIdWithConflict].hasConflictWith.push(boxIdCausingConflict);
                state.boxes[boxIdCausingConflict].hasConflict = true;
                state.boxes[boxIdCausingConflict].hasConflictWith.push(boxIdWithConflict);
            },
            prepare(boxIdWithConflict, boxIdCausingConflict) {
                return {
                    boxIdWithConflict,
                    boxIdCausingConflict
                };
            }
        },
        clearFromHasConflicts: {
            reducer(state, action) {
                const { boxIdWithConflict, boxIdToClear } = action.payload;
                const newConflictsArray = state.boxes[boxIdWithConflict].hasConflictWith.filter(boxId => {
                    return boxId !== boxIdToClear;
                });
                state.boxes[boxIdWithConflict].hasConflictWith = newConflictsArray;
            },
            prepare(boxIdWithConflict, boxIdToClear) {
                return {
                    boxIdWithConflict,
                    boxIdToClear
                };
            }
        },
        clearHasConflicts(state, action) {
            state.boxes[action.payload].hasConflictWith = [];
        },
        saveBoxAsInputted(state, action) {
            state.boxes[action.payload].inputted = true;
        },
        unsolveBox(state, action) {
            state.boxes[action.payload].solved = false
        },
        boxSolved: {
            reducer(state, action) {
                const { boxId, value } = action.payload;
                state.boxes[boxId] = {
                    ...state.boxes[boxId],
                    solved: true,
                    value: value
                };
            },
            prepare(boxId, value) {
                return {
                    boxId,
                    value
                };
            }
        }
    }
});

export const {
    resetBoard,
    resetBoardToStart,
    addErrorToBoard,
    clearErrorFromBoard,
    clearAllErrors,
    boardStartSaved,
    stopSolving,
    increaseInputtedNumber,
    decreaseInputtedNumber,
    increaseSolvedNumber,
    decreaseSolvedNumber,
    increaseLogicRounds,
    increaseCheckForGivensRounds,
    addBoxToCheckForGivensArray,
    increaseSlicingRounds,
    addBoxToSlicingArray,
    updateBoxValue,
    addErrorToBox,
    clearAllErrorsFromBox,
    clearErrorFromBox,
    addConflictToBox,
    clearFromHasConflicts,
    clearHasConflicts,
    saveBoxAsInputted,
    unsolveBox,
    boxSolved
} = boardSlice.actions;

export default boardSlice.reducer;