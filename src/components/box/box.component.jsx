import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectBox } from "../../redux/board/board.selectors";
import { validateBoxValue } from "../../redux/board/saga.actions";

import { BoxContainer } from "./box.styles";

const Box = ({ boxId }) => {
    console.log("boxId = ", boxId);
    const box = useSelector(selectBox(boxId));

    const { value, hasError, hasConflictWith, solved } = box;
    const hasConflict = hasConflictWith.length > 0;
    const dispatch = useDispatch();
    const validateValue = (id, value) => dispatch(validateBoxValue(id, value));

    return (
        <BoxContainer
            className="box"
            value={value ? value : ""}
            onChange={event => validateValue(boxId, event.target.value)}
            hasError={hasError || hasConflict}
            isSolved={solved}
        />
    )
}

export default Box;