import './App.css';
import React from "react";
import { useSelector } from 'react-redux';
import styled from "styled-components";

import Row from './components/row.component';
import { selectErrors } from './redux/board/board.selectors';

const Board = styled.div`
  align-items: center;
`;

const Title = styled.h1`
  justify-content: center;
  align-items: center;
  text-align: center;
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

const App = () => {
  const errors = useSelector(selectErrors);
  const errorsArray = Object.entries(errors);

  console.log("errorsArray = ", errorsArray);
  console.log("errors = ", errors);

  return (
    <Page>
      <Title>Sudoku Solver</Title>
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
    </Page>
  );
}

export default App;
