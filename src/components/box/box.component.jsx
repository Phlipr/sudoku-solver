import React, { useState } from "react";
import styled from "styled-components";

const BoxContainer = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    background-color: lightblue;
    text-align: center;
    width: 50px;
    height: 50px;
    margin: 5px;
`;

const Box = ({ initialValue }) => {
    const [value, setValue] = useState(initialValue);
    return (
        <BoxContainer
            className="box"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
    )
}

export default Box;