// base imports
import React from "react";

// components and constants imports
import Square from "../square/square.component";
import { BOARD_ORDER } from "../../constants";

// style imports
import { RowContainer } from "./row.styles";

const renderSquares = id => {
    let squares = [];
    for (let i = 0; i < BOARD_ORDER; i++) {
        squares.push(<Square id={`${id}-${i + 1}`} key={`${id}-${i + 1}`} />)
    }

    return squares;
};

const Row = ({ id }) => (
    <>
        <RowContainer>
            {
                renderSquares(id)
            }
        </RowContainer>
    </>

);

export default Row;