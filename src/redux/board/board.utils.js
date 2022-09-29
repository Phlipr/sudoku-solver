const generateAllBoxIds = (currentString) => {
    if (currentString[0] > 3) return;
    if (currentString[2] > 3) return;
    if (currentString.length === 6) return [currentString.substring(0, 5)];

    var ret = [];

    for (var i = 1; i < 10; i++) {
        ret.push.apply(ret, generateAllBoxIds(currentString + i + "-"));
    }

    return ret;
}

const getRowNumber = (boxId) => {
    let squareRow = boxId[0];
    let box = boxId[4];

    let rowlet = Math.ceil(box / 3);

    let row = (squareRow - 1) * 3 + rowlet;

    return row;
};

const getColumnNumber = (boxId) => {
    let squareColumn = boxId[2];
    let box = boxId[4];

    let columnlet = box % 3 === 0 ? 3 : box % 3;

    let column = (squareColumn - 1) * 3 + columnlet;

    return column;
};

const getSquareNumber = (boxId) => {
    let squareRow = parseInt(boxId[0]);
    let squareColumn = parseInt(boxId[2]);

    let square = (squareRow - 1) * 3 + squareColumn;

    return square;
}

export const generateInitialState = () => {
    let rowState = {};
    let columnState = {};
    let squareState = {};

    for (var i = 1; i < 10; i++) {
        rowState[i] = [];
        columnState[i] = [];
        squareState[i] = [];
    }

    let boxIdArray = generateAllBoxIds('');

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

export const addErrorToBoard = (errors, error) => {
    console.log("addErrorToBoard...");
    console.log("errors = ", errors);
    console.log("error = ", error);
    errors = {
        ...errors,
        [error.boxId]: error.errorMessage
    };

    return errors;
};

export const removeErrorFromBoard = (errors, boxIdToRemove) => {
    console.log("removeErrorFromBoard...");
    console.log("errors = ", errors);
    console.log("boxIdToRevmove = ", boxIdToRemove);

    let errorsArray = Object.entries(errors);

    console.log("errorsArray = ", errorsArray);

    let filteredErrors = errorsArray.reduce((currObj, error) => {
        console.log("currObj = ", currObj);
        console.log("error = ", error);

        if (error[0] === boxIdToRemove) {
            console.log("current error matches boxIdToRemove");
            return currObj;
        }

        currObj[error[0]] = error[1];

        return currObj;
    }, {});

    console.log("filteredErrors = ", filteredErrors);

    return filteredErrors;
};

export const addConflictWithToBox = (conflicts, conflict) => {
    return [...conflicts, conflict];
};

export const addBoxToCheckForGivensArray = (givens, given) => {
    return [...givens, given];
};

export const addBoxToSlicedArray = (slices, sliced) => {
    return [...slices, sliced];
};