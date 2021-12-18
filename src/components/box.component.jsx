import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import { selectBox } from "../redux/board/board.selectors";
import { validateBoxValue } from "../redux/board/board.actions";

const normalBoxColoring = css`
    background-color: lightblue;
    color: black;
`;

const boxErrorColoring = css`
    background-color: lightcoral;
    color: darkred;
`;

const boxSolvedColoring = css`
    background-color: lightgreen;
    color: darkgreen;
`;

const getBoxColoring = props => {
    if (props.hasError) {
        return boxErrorColoring;
    }

    return props.isSolved ? boxSolvedColoring : normalBoxColoring;
};

const BoxContainer = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    font-size: 20px;
    height: 40px;
    width: 40px;

    ${getBoxColoring}
`;

const Box = ({ id }) => {
    const box = useSelector(selectBox(id));

    const { value, hasError, hasConflictWith, solved } = box;
    const hasConflict = hasConflictWith.length > 0;
    const dispatch = useDispatch();
    const validateValue = (id, value) => dispatch(validateBoxValue(id, value));

    return (
        <BoxContainer
            className="box"
            value={value ? value : ""}
            onChange={event => validateValue(id, event.target.value)}
            hasError={hasError || hasConflict}
            isSolved={solved}
        />
    )
}

export default Box;