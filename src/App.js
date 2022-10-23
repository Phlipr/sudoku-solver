// base imports
import React from "react";
import { useSelector, useDispatch } from 'react-redux';

// components and constants imports
import Row from './components/row/row.component';
import { BOARD_ORDER } from "./constants.js";

// Redux actions and selectors imports
import {
  selectBoxesInputted,
  selectErrors,
  selectSolving,
  selectBoxesSolved,
  selectLogicRounds,
  selectCheckForGivensRounds,
  selectCheckForGivensArray,
  selectSlicingRounds,
  selectSlicingArray
} from './redux/board/board.selectors';
import {
  saveBoardInputs as saveBoardInputsInRedux
} from './redux/board/saga.actions';
import {
  resetBoard as resetBoardInRedux,
  clearAllErrors as clearAllErrorsInRedux,
  resetBoardToStart as resetBoardToStartInRedux
} from './redux/board/board.slice'

// style imports
import {
  Board,
  Page,
  Title,
  StyledButton,
  ButtonContainer,
  BoxNumbers,
  Error,
  ErrorTitle,
  ErrorSubTitle
} from './App.styles.js';

const App = () => {
  // Redux selectors
  const boxesInputted = useSelector(selectBoxesInputted);
  const boxesSolved = useSelector(selectBoxesSolved);
  const checkForGivensRounds = useSelector(selectCheckForGivensRounds);
  const checkforGivensArray = useSelector(selectCheckForGivensArray);
  const errors = useSelector(selectErrors);
  const logicRounds = useSelector(selectLogicRounds);
  const slicingRounds = useSelector(selectSlicingRounds);
  const slicingArray = useSelector(selectSlicingArray);
  const solvingPuzzle = useSelector(selectSolving);

  // Redux actions
  const dispatch = useDispatch();

  const clearAllErrors = () => dispatch(clearAllErrorsInRedux());
  const resetBoard = () => dispatch(resetBoardInRedux());
  const resetBoardToStart = () => dispatch(resetBoardToStartInRedux());
  const saveBoardInputs = () => dispatch(saveBoardInputsInRedux());

  // Display variables  
  const errorsArray = Object.entries(errors);

  const renderRows = () => {
    let rows = [];
    for (let i = 0; i < BOARD_ORDER; i++) {
      rows.push(<Row id={i + 1} key={i + 1} />);
    }

    return rows;
  };

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
        <span>{`Boxes Solved: ${boxesSolved}`}</span>
        <label htmlFor="solved">Boxes completed:</label>
        <progress id="solved" value={(boxesInputted + boxesSolved) / 81 * 100} max="100"></progress>
      </BoxNumbers>
      <Board>
        {
          renderRows()
        }
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
      {solvingPuzzle &&
        <>
          <div>Logic Rounds: {logicRounds}</div>
          <div>CheckForGivens Rounds: {checkForGivensRounds}</div>
          <div>Slicing Rounds: {slicingRounds}</div>
          <h2>CheckForGivens:</h2>
          <h5>Box Notation: row-column(CheckForGivens Round)</h5>
          <div>{checkforGivensArray.toString()}</div>
          <h2>Slicing:</h2>
          <h5>Box Notation: row-column(Slicing Round)</h5>
          <div>{slicingArray.toString()}</div>
        </>
      }
    </Page>
  );
}

export default App;
