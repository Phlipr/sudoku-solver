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
            possibles: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            row: getRowNumber(boxId),
            column: getColumnNumber(boxId),
            square: getSquareNumber(boxId),
            hasError: false,
            hasConflictWith: []
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
        errors: []
    }

    return boardState;
};

export const addErrorToBoard = (errors, error) => {
    if (errors.includes(error)) {
        console.log("error included in errors already...");
        return errors;
    }
    return [...errors, error];
};

export const addConflictWithToBox = (conflicts, conflict) => {
    return [...conflicts, conflict];
}