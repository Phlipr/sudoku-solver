// base imports
import React from "react";

// components and constants imports
import Square from "../square/square.component";
import { BOARD_ORDER } from "../../constants";

// style imports
import { BigRowContainer } from "./big-row.styles";

const renderSquares = bigRowId => {
    let squares = [];
    for (let i = 0; i < BOARD_ORDER; i++) {
        squares.push(<Square squareId={`${bigRowId}-${i + 1}`} key={`${bigRowId}-${i + 1}`} />)
    }

    return squares;
};

const BigRow = ({ bigRowId }) => (
    <>
        <BigRowContainer>
            {
                renderSquares(bigRowId)
            }
        </BigRowContainer>
    </>

);

export default BigRow;