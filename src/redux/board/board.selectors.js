import { createSelector } from "reselect";
import { memoize } from "lodash";

const selectBoxes = state => state.board.boxes;

// Selectors related to boxes
export const selectBoxValue = memoize((boxId) =>
    createSelector(
        [selectBoxes],
        boxes => boxes ? boxes[boxId].value : ""
    )
);

export const selectBoxConflict = memoize((boxId) =>
    createSelector(
        [selectBoxes],
        boxes => boxes ? boxes[boxId].conflicted.hasConflict : false
    )
);