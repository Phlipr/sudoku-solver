import './App.css';
import React from "react";
import styled from "styled-components";

import Row from './components/row.component';

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

const App = () => {

  return (
    <Page>
      <Title>Sudoku Solver</Title>
      <Board>
        <Row id={1} />
        <Row id={2} />
        <Row id={3} />
      </Board>
    </Page>
  );
}

export default App;
