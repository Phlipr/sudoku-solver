import BoardStatActionTypes from "../action-types/boardStat.types";

export const increaseInputtedNumber = () => ({
    type: BoardStatActionTypes.INCREASE_INPUTTED_NUMBER
});

export const decreaseInputtedNumber = () => ({
    type: BoardStatActionTypes.DECREASE_INPUTTED_NUMBER
});

export const increaseSolvedNumber = () => ({
    type: BoardStatActionTypes.INCREASE_SOLVED_NUMBER
});

export const decreaseSolvedNumber = () => ({
    type: BoardStatActionTypes.DECREASE_SOLVED_NUMBER
});

export const increaseLogicRounds = () => ({
    type: BoardStatActionTypes.INCREASE_LOGIC_ROUNDS
});

export const increaseCheckForGivensRounds = () => ({
    type: BoardStatActionTypes.INCREASE_CHECK_FOR_GIVENS_ROUNDS
});

export const addBoxToCheckForGivensArray = (given) => ({
    type: BoardStatActionTypes.ADD_BOX_TO_CHECK_FOR_GIVENS_ARRAY,
    given
});

export const increaseSlicingRounds = () => ({
    type: BoardStatActionTypes.INCREASE_SLICING_ROUNDS
});

export const addBoxToSlicedArray = (sliced) => ({
    type: BoardStatActionTypes.ADD_BOX_TO_SLICED_ARRAY,
    sliced
});