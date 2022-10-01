import styled, { css } from "styled-components";

// Box color styles

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

// End of Box color styles

export const BoxContainer = styled.input`
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
    font-size: 20px;
    height: 40px;
    width: 40px;

    ${getBoxColoring}
`;