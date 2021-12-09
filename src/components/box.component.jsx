import React, { useState } from "react";
import styled from "styled-components";

const BoxContainer = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    background-color: lightblue;
    text-align: center;
    font-size: 20px;
    height: 40px;
    width: 40px;
`;

const Box = ({ id }) => {
    const [value, setValue] = useState("");
    return (
        <BoxContainer
            className="box"
            value={value}
            onChange={event => setValue(event.target.value)}
        />
    )
}

export default Box;