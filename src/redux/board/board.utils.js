import { BOARD_ORDER, TOTAL_BOXES_PER_SQUARE } from "../../constants";

// BoxId = '#-#-#'
// First # = Macrorow (large row based on BOARD_ORDER, each board contains BOARD_ORDER macrorows and each macrorow contains BOARD_ORDER Squares)
// Second # = Square within macrorow (1 on left up to BOARD_ORDER on right)
// Third # - Individual box within square (1 on top, left to TOTAL_BOXES_PER_SQUARE on bottom, right)
const generateAllBoxIds = () => {
    let ret = [];
    for (let macroRow = 1; macroRow < BOARD_ORDER + 1; macroRow++) {
        for (let macroRowSquare = 1; macroRowSquare < BOARD_ORDER + 1; macroRowSquare++) {
            for (let boxWihtinSqure = 1; boxWihtinSqure < TOTAL_BOXES_PER_SQUARE + 1; boxWihtinSqure++) {
                ret.push("" + macroRow + "-" + macroRowSquare + "-" + boxWihtinSqure);
            }
        }
    }

    return ret;
}

// parsing methods for retreiving information
// from boxIds
const parseMacroRow = boxId => {
    let indexOfFirstDash = boxId.indexOf("-");

    return parseInt(boxId.substring(0, indexOfFirstDash));
};

const parseMacroColumn = boxId => {
    let indexOfFirstDash = boxId.indexOf("-");
    let indexOfSecondDash = boxId.lastIndexOf("-");

    return parseInt(boxId.substring(indexOfFirstDash + 1, indexOfSecondDash));
};

const parseBox = boxId => {
    let indexOfSecondDash = boxId.lastIndexOf("-");

    return parseInt(boxId.substring(indexOfSecondDash + 1, boxId.length));
};

// determines row number based on boxId
// each board will have TOTAL_BOXES_PER_SQUARE number of rows
// with row 1 on top and row TOTAL_BOXES_PER_SQUARE on bottom
// each board will have BOARD_ORDER number of macrorows AND
// each macrorow will have BOARD_ORDER number of rows
const getRowNumber = (boxId) => {
    let macroRow = parseMacroRow(boxId);
    let box = parseBox(boxId);

    let rowlet = Math.ceil(box / BOARD_ORDER); // the row within the square

    let row = (macroRow - 1) * BOARD_ORDER + rowlet; // the row within the board

    return row;
};

// determines column number based on boxId
// each board will have TOTAL_BOXES_PER_SQUARE number of columns
// with column 1 on left and column TOTAL_BOXES_PER_SQUARE on right
// each board will have BOARD_ORDER number of macrocolumns and
// each macrocolumn will have BOARD_ORDER number of columns
const getColumnNumber = (boxId) => {
    let macroColumn = parseMacroColumn(boxId);
    let box = parseBox(boxId);

    let columnlet = box % BOARD_ORDER === 0 ? BOARD_ORDER : box % BOARD_ORDER; // the column within the square

    let column = (macroColumn - 1) * BOARD_ORDER + columnlet; // the column within the board

    return column;
};

// determines overall square number based on boxId
// each board will have TOTAL_BOXES_PER_SQUARE number of squares
// with square 1 being in the top, left and square TOTAL_BOXES_PER_SQUARE in bottom, right
const getSquareNumber = (boxId) => {
    let macroRow = parseMacroRow(boxId);
    let macroColumn = parseMacroColumn(boxId);

    let square = (macroRow - 1) * BOARD_ORDER + macroColumn;

    return square;
}

export const generateInitialState = () => {
    let rowState = {};
    let columnState = {};
    let squareState = {};

    // containers for quick lookup of which boxIds
    //   are in whicih row, column, and state
    for (var i = 1; i < TOTAL_BOXES_PER_SQUARE + 1; i++) {
        rowState[i] = [];
        columnState[i] = [];
        squareState[i] = [];
    }

    let boxIdArray = generateAllBoxIds();

    let boxState = boxIdArray.reduce((currObject, boxId) => {
        currObject[boxId] = {
            boxId: boxId,
            value: 0,
            row: getRowNumber(boxId),
            column: getColumnNumber(boxId),
            square: getSquareNumber(boxId),
            hasError: false,
            hasConflictWith: [],
            inputted: false,
            solved: false
        };
        rowState[currObject[boxId].row].push(boxId);
        columnState[currObject[boxId].column].push(boxId);
        squareState[currObject[boxId].square].push(boxId);
        return currObject;
    }, {});

    let boardState = {
        boxes: boxState,
        rows: rowState,
        columns: columnState,
        squares: squareState,
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