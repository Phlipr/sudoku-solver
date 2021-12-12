import { all, call } from "redux-saga/effects";

import { boardSagas } from "./board/board.sagas";

export default function* rootSaga() {
    yield all([call(boardSagas)]);
};