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

const App = () => {
  const errors = useSelector(selectErrors);

  return (
    <Page>
      <Title>Sudoku Solver</Title>
      <Board>
        <Row id={1} />
        <Row id={2} />
        <Row id={3} />
      </Board>
      {
        errors.map(error => {
          const { boxId, errorMessage } = error;
          return (
            <Error key={boxId} >
              {errorMessage}
            </Error>
          )
        })
      }
    </Page>
  );
}

export default App;
