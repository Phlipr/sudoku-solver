import styled from "styled-components";

import { BOARD_ORDER } from "./constants";

// High-level styles
export const Board = styled.div`
  align-items: center;
  margin-left: ${BOARD_ORDER > 5 ? "10px" : "none"};
`;

export const Page = styled.div`
  align-items: ${BOARD_ORDER > 5 ? "start" : "center"};
  display: flex;
  flex-direction: column;
`;

// Specific element styling
export const Title = styled.h1`
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: ${BOARD_ORDER > 5 ? "10px" : "none"};
`;

export const StyledButton = styled.button`
  border: 2px solid black;
  border-radius: 5px;
  background-color: ${({ bgColor = "lightblue" }) => bgColor};
  color: black;
  margin: 5px;
  font-size: 25px;
  font-weight: bold;

  &:hover {
    background-color: white;
    color: ${({ bgColor = "lightblue" }) => bgColor};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
`;

export const BoxNumbers = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & span {
    margin: 0 15px;
  }

  & progress {
    margin-left: 10px;
    margin-top: 7px;
  }

  & label {
    margin-left: 20px;
  }
`;

// Error styles
export const Error = styled.div`
  color: red
`;

export const ErrorTitle = styled.h2`
  color: red;
  font-weight: bold;
  margin-bottom: 0;
`;

export const ErrorSubTitle = styled.h3`
  color: red;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 0;
`;