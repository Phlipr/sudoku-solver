import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { selectBox } from "../redux/board/board.selectors";
import { validateBoxValue } from "../redux/board/board.actions";

const BoxContainer = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    background-color: ${({ hasError }) => (hasError ? 'lightcoral' : 'lightblue')};
    color: ${({ hasError }) => (hasError ? 'darkred' : 'black')};
    text-align: center;
    font-size: 20px;
    height: 40px;
    width: 40px;
`;

const Box = ({ id }) => {
    const box = useSelector(selectBox(id));

    const { value, hasError, hasConflictWith } = box;
    const hasConflict = hasConflictWith.length > 0;
    const dispatch = useDispatch();
    const validateValue = (id, value) => dispatch(validateBoxValue(id, value));

    return (
        <BoxContainer
            className="box"
            value={value ? value : ""}
            onChange={event => validateValue(id, event.target.value)}
            hasError={hasError || hasConflict}
        />
    )
}

export default Box;