// base imports
import React from "react";

// component and constants imports
import Box from "../box/box.component";
import { TOTAL_BOXES_PER_SQUARE } from "../../constants";

// style imports
import { SquareContainer } from "./square.styles";
import { getColumnNumberFromTempBoxId, getRowNumberFromTempBoxId, getSquareNumberFromTempBoxId } from "../../redux/board/board.utils";

const determineBoxId = (currSquareId, index) => {
    let tempBoxId = currSquareId + "-" + index;
    let rowId = getRowNumberFromTempBoxId(tempBoxId);
    let columnId = getColumnNumberFromTempBoxId(tempBoxId);
    let squareId = getSquareNumberFromTempBoxId(tempBoxId);
    return "" + rowId + "-" + columnId + "-" + squareId;
};

const renderBoxes = squareId => {
    let boxes = [];
    for (let i = 0; i < TOTAL_BOXES_PER_SQUARE; i++) {
        let boxId = determineBoxId(squareId, i + 1);
        boxes.push(<Box boxId={boxId} key={boxId} />);
    }

    return boxes;
};

const Square = ({ squareId }) => (
    <>
        <SquareContainer>
            {
                renderBoxes(squareId)
            }
        </SquareContainer>
    </>
);

export default Square;