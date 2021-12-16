import './App.css';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";

import Row from './components/row.component';
import { selectBoxesInputted, selectErrors, selectSolving } from './redux/board/board.selectors';
import {
  resetBoard as resetBoardInRedux,
  clearAllErrors as clearAllErrorsInRedux,
  saveBoardInputs as saveBoardInputsInRedux,
  resetBoardToStart as resetBoardToStartInRedux
} from './redux/board/board.actions';

const Board = styled.div`
  align-items: center;
`;

const Title = styled.h1`
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BoxNumbers = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Page = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  color: red
`;

const ErrorTitle = styled.h2`
  color: red;
  font-weight: bold;
  margin-bottom: 0;
`;

const ErrorSubTitle = styled.h3`
  color: red;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 0;
`;

const StyledButton = styled.button`
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px;
`;

const App = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectErrors);
  const solvingPuzzle = useSelector(selectSolving);
  const boxesInputted = useSelector(selectBoxesInputted);
  const errorsArray = Object.entries(errors);

  const resetBoard = () => dispatch(resetBoardInRedux());
  const clearAllErrors = () => dispatch(clearAllErrorsInRedux());
  const saveBoardInputs = () => dispatch(saveBoardInputsInRedux());
  const resetBoardToStart = () => dispatch(resetBoardToStartInRedux());

  console.log("errorsArray = ", errorsArray);
  console.log("errors = ", errors);

  return (
    <Page>
      <Title>Sudoku Solver</Title>
      {!solvingPuzzle &&
        <ButtonContainer>
          <StyledButton onClick={resetBoard}>
            Reset Board to Blank
          </StyledButton>
          <StyledButton onClick={clearAllErrors}>
            Clear All Errors
          </StyledButton>
        </ButtonContainer>
      }
      <BoxNumbers>
        <span>{`Boxes Inputted: ${boxesInputted}`}</span>
      </BoxNumbers>
      <Board>
        <Row id={1} />
        <Row id={2} />
        <Row id={3} />
      </Board>
      {errorsArray.length > 0 &&
        <>
          <ErrorTitle>
            Errors:
          </ErrorTitle>
          <ErrorSubTitle>
            Boxes are referred to by 'row-column' notation.
          </ErrorSubTitle>
        </>
      }
      {
        errorsArray.map(error => (
          <Error key={error[0]} >
            {error[1]}
          </Error>
        ))
      }
      {errorsArray.length === 0 &&
        <>
          <ButtonContainer>
            {solvingPuzzle &&
              <StyledButton bgColor="red" onClick={resetBoardToStart}>
                Reset Board to Start
              </StyledButton>
            }
            {!solvingPuzzle &&
              <StyledButton bgColor="green" onClick={saveBoardInputs}>
                Solve Puzzle
              </StyledButton>
            }
          </ButtonContainer>
        </>
      }
    </Page>
  );
}

export default App;
