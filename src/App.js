import './App.css';
import React, { useState } from "react";
import styled from "styled-components";

import Box from './components/box/box.component';

const Board = styled.div`
  display: flex;
`;

const initialBoxList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  const [boxes, setBoxes] = useState(initialBoxList);

  return (
    <Board>
      {
        boxes.map((box, idx) => (
          <Box initialValue={box} id={idx} />
        ))
      }
    </Board>
  );
}

export default App;
