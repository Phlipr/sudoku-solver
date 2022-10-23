import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import boardReducer from "./board/board.slice"
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

const store = configureStore({
    reducer: {
        board: boardReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(middlewares)
});

sagaMiddleware.run(rootSaga);

export default store;