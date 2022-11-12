import { BOARD_ORDER, TOTAL_BOXES_PER_SQUARE } from "../../constants";

// BoxId = '#-#-#'
// First # = Row (Top = 1; Bottom = TOTAL_BOXES_PERSQUARE)
// Second # = Column (Left = 1; Right = TOTAL_BOXES_PERSQUARE)
// Third # = Square (Top, Left = 1; Bottom, Right = TOTAL_BOXES_PERSQUARE)
const generateAllBoxIds = () => {
    let squareIds = []
    for (let bigRow = 1; bigRow < BOARD_ORDER + 1; bigRow++) {
        for (let square = 1; square < BOARD_ORDER + 1; square++) {
            let squareId = "" + bigRow + "-" + square;
            squareIds.push(squareId);
        }
    }

    console.log("squareIds = ", squareIds);

    let boxIds = [];
    for (let squareId of squareIds) {
        for (let box = 1; box < TOTAL_BOXES_PER_SQUARE + 1; box++) {
            let tempBoxId = squareId + "-" + box;
            let row = getRowNumberFromTempBoxId(tempBoxId);
            let column = getColumnNumberFromTempBoxId(tempBoxId);
            let square = getSquareNumberFromTempBoxId(tempBoxId);
            let boxId = "" + row + "-" + column + "-" + square;
            boxIds.push(boxId);
        }
    }

    console.log("boxIds = ", boxIds);

    return boxIds;
}

// parsing methods for retreiving information
// from boxIds
const parseFirstNumberFromId = boxId => {
    let indexOfFirstDash = boxId.indexOf("-");

    return parseInt(boxId.substring(0, indexOfFirstDash));
};

const parseSecondNumberFromId = boxId => {
    let indexOfFirstDash = boxId.indexOf("-");
    let indexOfSecondDash = boxId.lastIndexOf("-");

    return parseInt(boxId.substring(indexOfFirstDash + 1, indexOfSecondDash));
};

const parseLastNumberFromId = boxId => {
    let indexOfSecondDash = boxId.lastIndexOf("-");

    return parseInt(boxId.substring(indexOfSecondDash + 1, boxId.length));
};

// determines row number based on tempBoxId
// each board will have TOTAL_BOXES_PER_SQUARE number of rows
// with row 1 on top and row TOTAL_BOXES_PER_SQUARE on bottom
// each board will have BOARD_ORDER number of bigRows AND
// each bigRow will have BOARD_ORDER number of rows
export const getRowNumberFromTempBoxId = (tempBoxId) => {
    let bigRow = parseFirstNumberFromId(tempBoxId);
    let box = parseLastNumberFromId(tempBoxId);

    let rowlet = Math.ceil(box / BOARD_ORDER); // the row within the square

    let row = (bigRow - 1) * BOARD_ORDER + rowlet; // the row within the board

    return row;
};

// determines column number based on tempBoxId
// each board will have TOTAL_BOXES_PER_SQUARE number of columns
// with column 1 on left and column TOTAL_BOXES_PER_SQUARE on right
// each board will have BOARD_ORDER number of macrocolumns and
// each macrocolumn will have BOARD_ORDER number of columns
export const getColumnNumberFromTempBoxId = (tempBoxId) => {
    let macroColumn = parseSecondNumberFromId(tempBoxId);
    let box = parseLastNumberFromId(tempBoxId);

    let columnlet = box % BOARD_ORDER === 0 ? BOARD_ORDER : box % BOARD_ORDER; // the column within the square

    let column = (macroColumn - 1) * BOARD_ORDER + columnlet; // the column within the board

    return column;
};

// determines overall square number based on tempBoxid
// each board will have TOTAL_BOXES_PER_SQUARE number of squares
// with square 1 being in the top, left and square TOTAL_BOXES_PER_SQUARE in bottom, right
export const getSquareNumberFromTempBoxId = (tempBoxId) => {
    let bigRow = parseFirstNumberFromId(tempBoxId);
    let macroColumn = parseSecondNumberFromId(tempBoxId);

    let square = (bigRow - 1) * BOARD_ORDER + macroColumn;

    return square;
}

export const generateInitialState = () => {
    let rowIdState = {};
    let columnIdState = {};
    let squareIdState = {};
    let allPossibleValues = [];

    // containers for quick lookup of which boxIds
    //   are in whicih row, column, and state
    for (var i = 1; i < TOTAL_BOXES_PER_SQUARE + 1; i++) {
        rowIdState[i] = [];
        columnIdState[i] = [];
        squareIdState[i] = [];
        allPossibleValues.push(i);
    }

    let boxIdArray = generateAllBoxIds();

    let boxState = boxIdArray.reduce((currObject, boxId) => {
        currObject[boxId] = {
            boxId: boxId,
            value: 0,
            row: parseFirstNumberFromId(boxId),
            column: parseSecondNumberFromId(boxId),
            square: parseLastNumberFromId(boxId),
            possibles: allPossibleValues,
            hasError: false,
            hasConflictWith: [],
            inputted: false,
            solved: false
        };
        rowIdState[currObject[boxId].row].push(boxId);
        columnIdState[currObject[boxId].column].push(boxId);
        squareIdState[currObject[boxId].square].push(boxId);
        return currObject;
    }, {});

    let boardState = {
        boxes: boxState,
        rowIds: rowIdState,
        columnIds: columnIdState,
        squareIds: squareIdState,
        errors: {},
        solving: false,
        boxesInputted: 0,
        boxesSolved: 0,
        logicRounds: 0,
        checkForGivensRounds: 0,
        checkForGivensArray: [],
        slicingRounds: 0,
        slicingArray: []
    }

    console.log(boardState);

    return boardState;
};

export const removeErrorFromBoard = (errors, boxIdToRemove) => {
    let errorsArray = Object.entries(errors);

    let filteredErrors = errorsArray.reduce((currObj, error) => {

        if (error[0] === boxIdToRemove) {
            return currObj;
        }

        currObj[error[0]] = error[1];

        return currObj;
    }, {});

    return filteredErrors;
};