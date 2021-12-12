import { createSelector } from "reselect";
import { memoize } from "lodash";

// Selectors related to the board
const selectBoard = state => state.board;

export const selectErrors = createSelector(
    [selectBoard],
    board => board ? board.errors : []
);

// Selectors related to boxes
const selectBoxes = createSelector(
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
const selectRows = createSelector(
    [selectBoard],
    board => board.rows
);

export const selectRowValues = memoize((row) =>
    createSelector(
        [selectRows, selectBoxes],
        (rows, boxes) => {
            let boxIdsInRow = rows[row];

            return boxIdsInRow.reduce((currObj, boxId) => {
                let value = boxes[boxId].value;

                if (value === 0) return currObj

                currObj[value] = boxId;

                return currObj;
            }, {});
        }
    )
);

// Selectors related to columns
const selectColumns = createSelector(
    [selectBoard],
    board => board.columns
);

export const selectColumnValues = memoize((column) =>
    createSelector(
        [selectColumns, selectBoxes],
        (columns, boxes) => {
            let boxIdsInColumn = columns[column];

            return boxIdsInColumn.reduce((currObj, boxId) => {
                let value = boxes[boxId].value;

                if (value === 0) return currObj

                currObj[value] = boxId;

                return currObj;
            }, {});
        }
    )
);

// Selectors related to squares
const selectSquares = createSelector(
    [selectBoard],
    board => board.squares
);

export const selectSquareValues = memoize((square) =>
    createSelector(
        [selectSquares, selectBoxes],
        (squares, boxes) => {
            let boxIdsInSquare = squares[square];

            return boxIdsInSquare.reduce((currObj, boxId) => {
                let value = boxes[boxId].value;

                if (value === 0) return currObj

                currObj[value] = boxId;

                return currObj;
            }, {});
        }
    )
);