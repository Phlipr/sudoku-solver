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
    let bigRow = boxId[0];
    let box = boxId[4];

    let rowlet = Math.ceil(box / 3);

    let row = (bigRow - 1) * 3 + rowlet;

    return row;
};

const getColumnNumber = (boxId) => {
    return 1;
};

const getSquareNumber = (boxId) => {
    return 1;
}

export const generateInitialState = () => {
    let boxIdArray = generateAllBoxIds('');

    let boxState = boxIdArray.reduce((currObject, boxId) => {
        currObject[boxId] = {
            possibles: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            row: getRowNumber(boxId),
            column: getColumnNumber(boxId),
            square: getSquareNumber(boxId)
        };
        return currObject;
    }, {});

    return boxState;
};