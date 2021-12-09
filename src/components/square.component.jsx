import React from "react";
import styled from "styled-components";

import Box from "./box.component";

const SquareContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 10px;
    row-gap: 10px;
    border: 6px solid black;
    padding: 5px;
    align-items: center;
    margin: auto;
`;

const Square = ({ id }) => (
    <>
        <SquareContainer>
            <Box id={`${id}-1`} />
            <Box id={`${id}-2`} />
            <Box id={`${id}-3`} />
            <Box id={`${id}-4`} />
            <Box id={`${id}-5`} />
            <Box id={`${id}-6`} />
            <Box id={`${id}-7`} />
            <Box id={`${id}-8`} />
            <Box id={`${id}-9`} />
        </SquareContainer>
    </>
);

export default Square;