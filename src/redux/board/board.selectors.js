import { createSelector } from "@reduxjs/toolkit";
import { memoize } from "lodash";

// Selectors related to the board
const selectBoard = state => state.board;

export const selectErrors = createSelector(
    [selectBoard],
    board => board ? board.errors : []
);

export const selectSolving = createSelector(
    [selectBoard],
    board => board ? board.solving : false
);

export const selectBoxesInputted = createSelector(
    [selectBoard],
    board => board ? board.boxesInputted : 0
);

export const selectBoxesSolved = createSelector(
    [selectBoard],
    board => board ? board.boxesSolved : 0
);

export const selectLogicRounds = createSelector(
    [selectBoard],
    board => board ? board.logicRounds : 0
);

export const selectCheckForGivensRounds = createSelector(
    [selectBoard],
    board => board ? board.checkForGivensRounds : 0
);

export const selectCheckForGivensArray = createSelector(
    [selectBoard],
    board => board ? board.checkForGivensArray : []
);

export const selectSlicingRounds = createSelector(
    [selectBoard],
    board => board ? board.slicingRounds : 0
);

export const selectSlicingArray = createSelector(
    [selectBoard],
    board => board ? board.slicingArray : []
);

// Selectors related to boxes
export const selectBoxes = createSelector(
    [selectBoard],
    board => board.boxes
);

export const selectBox = memoize((boxId) =>
    createSelector(
        [selectBoxes],
        boxes => boxes ? boxes[boxId] : ""
    )
);

// Selectors related to rows
const selectRowIds = createSelector(
    [selectBoard],
    board => board.rowIds
);

export const selectRowValues = memoize((row) =>
    createSelector(
        [selectRowIds, selectBoxes],
        (rowIds, boxes) => {
            let boxIdsInRow = rowIds[row];

            return boxIdsInRow.reduce((currObj, boxId) => {
                let value = boxes[boxId].value;

                if (value === 0 || value === "") return currObj

                currObj[value] = boxId;

                return currObj;
            }, {});
        }
    )
);

// Selectors related to columns
const selectColumnIds = createSelector(
    [selectBoard],
    board => board.columnIds
);

export const selectColumnValues = memoize((column) =>
    createSelector(
        [selectColumnIds, selectBoxes],
        (columnIds, boxes) => {
            let boxIdsInColumn = columnIds[column];

            return boxIdsInColumn.reduce((currObj, boxId) => {
                let value = boxes[boxId].value;

                if (value === 0 || value === "") return currObj

                currObj[value] = boxId;

                return currObj;
            }, {});
        }
    )
);

// Selectors related to squares
const selectSquareIds = createSelector(
    [selectBoard],
    board => board.squareIds
);

export const selectSquareValues = memoize((square) =>
    createSelector(
        [selectSquareIds, selectBoxes],
        (squareIds, boxes) => {
            let boxIdsInSquare = squareIds[square];

            return boxIdsInSquare.reduce((currObj, boxId) => {
                let value = boxes[boxId].value;

                if (value === 0 || value === "") return currObj

                currObj[value] = boxId;

                return currObj;
            }, {});
        }
    )
);