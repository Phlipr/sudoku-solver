import styled from "styled-components";

import { BOARD_ORDER } from "../../constants";

export const RowContainer = styled.div`
display: grid;
grid-template-columns: repeat(${BOARD_ORDER}, 1fr);
`;