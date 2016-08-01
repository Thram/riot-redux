/**
 * Created by thram on 16/06/16.
 */
import {reduce, assign} from "lodash";
import {Payload, isEvent} from "./utils";

export function payload(state) {
  return state.payload || {};
}

export function actions({id, methods, dispatch}) {
  return _.reduce(methods, function (result, method, action) {
    result[action] = function (options) {
      if (isEvent(options))  stopEvent(options);
      return dispatch(Payload(id || 'redux', action, method(options)));
    };
    return result;
  }, {});
}

export function defaultReducer(state, action) {
  return action;
}

export function nextState(state, action) {
  return action.payload ? assign(state, action.payload) : state;
}
