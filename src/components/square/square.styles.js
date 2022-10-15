import styled from "styled-components";

import { BOARD_ORDER } from "../../constants";

export const SquareContainer = styled.div`
display: grid;
grid-template-columns: repeat(${BOARD_ORDER}, 1fr);
column-gap: 10px;
row-gap: 10px;
border: 6px solid black;
padding: 5px;
align-items: center;
margin: auto;
`;