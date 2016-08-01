/**
 * Created by thram on 16/06/16.
 */
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {defaultReducer} from "../maps";

const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState, reducer) {
  return createStore(reducer || defaultReducer, initialState, enhancer);
}