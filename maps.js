/**
 * Created by thram on 16/06/16.
 */
import {reduce} from "lodash";
import {Payload, isEvent} from "utils";

export function payload(state) {
  return state.payload || {};
}

export function actions(methods, dispatch) {
  return _.reduce(methods, function (result, method, key) {
    result[key] = function (options) {
      if (isEvent(options)) {
        options.stopPropagation();
        options.preventDefault();
      }
      return dispatch(Payload(key, method(options)));
    };
    return result;
  }, {});
}

export function defaultReducer(state, action) {
  return action;
}
