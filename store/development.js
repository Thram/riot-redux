import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {defaultReducer} from "toolbox/maps";

const logger = createLogger({
  level    : 'info',
  collapsed: true
});

const enhancer = compose(applyMiddleware(thunk, logger));

export default function configureStore(initialState) {
  return createStore(defaultReducer, initialState, enhancer);
}