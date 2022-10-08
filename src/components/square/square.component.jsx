// base imports
import React from "react";

// component and constants imports
import Box from "../box/box.component";
import { TOTAL_BOXES_PER_SQUARE } from "../../constants";

// style imports
import { SquareContainer } from "./square.styles";

const renderBoxes = id => {
    let boxes = [];
    for (let i = 0; i < TOTAL_BOXES_PER_SQUARE; i++) {
        boxes.push(<Box id={`${id}-${i + 1}`} key={`${id}-${i + 1}`} />);
    }

    return boxes;
};

const Square = ({ id }) => (
    <>
        <SquareContainer>
            {
                renderBoxes(id)
            }
        </SquareContainer>
    </>
);

export default Square;