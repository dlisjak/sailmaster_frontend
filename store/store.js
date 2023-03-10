import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
// import { reducers } from "../reducers/index";
// import { sagas } from "../sagas/index";

// add the middlewares
let middlewares = [];

// add the saga middleware
const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add the redux dev tools
if (process.env.NODE_ENV !== "production" && typeof window !== "undefined" && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(reducers, middleware);

const _sagas = [sagas];
_sagas.forEach((saga) => sagaMiddleware.run(saga));

// export
export { store };
