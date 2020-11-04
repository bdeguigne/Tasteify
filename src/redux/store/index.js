import { createStore, compose, applyMiddleware } from "redux";
import reducers from '../reducers';
import thunkMiddleware from "redux-thunk";
// import { createLogger } from "redux-logger";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const loggerMiddleware = createLogger();

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
        )
    )
);

export default store;