import React from "react";
import styled from "styled-components";

import Square from "./square/square.component";

const RowContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 180px);
`;

const Row = ({ id }) => (
    <>
        <RowContainer>
            <Square id={`${id}-1`} />
            <Square id={`${id}-2`} />
            <Square id={`${id}-3`} />
        </RowContainer>
    </>

);

export default Row;