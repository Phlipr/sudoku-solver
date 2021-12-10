import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { selectBoxConflict, selectBoxValue } from "../redux/board/board.selectors";
import { updateBoxValue } from "../redux/board/board.actions";

const BoxContainer = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    background-color: ${({ hasConflict }) => (hasConflict ? 'lightcoral' : 'lightblue')};
    color: ${({ hasConflict }) => (hasConflict ? 'darkred' : 'black')};
    text-align: center;
    font-size: 20px;
    height: 40px;
    width: 40px;
`;

const Box = ({ id }) => {
    const value = useSelector(selectBoxValue(id));
    const conflicted = useSelector(selectBoxConflict(id));
    const dispatch = useDispatch();
    const updateValue = (id, value) => dispatch(updateBoxValue(id, value));

    const validateValue = (id, value) => {
        if (!value) {
            updateValue(id, value);
        }

        let inputNumber = parseInt(value);
        if (inputNumber >= 1 && inputNumber <= 9) {
            updateValue(id, value);
        }
    };

    return (
        <BoxContainer
            className="box"
            value={value ? value : ""}
            onChange={event => validateValue(id, event.target.value)}
            hasConflict={conflicted}
        />
    )
}

export default Box;