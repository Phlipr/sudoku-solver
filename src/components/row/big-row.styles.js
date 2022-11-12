import styled from "styled-components";

import { BOARD_ORDER } from "../../constants";

export const BigRowContainer = styled.div`
display: grid;
grid-template-columns: repeat(${BOARD_ORDER}, 1fr);
`;