/**
 * Created by thram on 14/04/16.
 */
import {isUndefined, isNull, isInteger, zipObject, isString, map, uniqueId, assign} from "lodash";

export function Payload(id, type, payload) {
  return assign({}, {id: id, type: type, payload: payload});
}

export function isEvent(obj) {
  if (!obj) return false;
  let s   = obj.toString(),
      ptr = document.all ? /\[object Event\]/ : /\[object (Keyboard|Mouse|Focus|Wheel|Composition|Storage)Event\]/;
  return ptr.test(s);
}

export function stopEvent(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}

export function toNumber(value, decimals) {
  if (isUndefined(value) || isNull(value)) return 0;
  let matches = value.toString().match(/[+-]?\d+(\.\d+)?/g);
  let result  = 0;
  if (matches) {
    result = parseFloat(matches.join(''));
    if (isInteger(decimals) && decimals >= 0) result = parseFloat(result.toFixed(decimals));
  }
  return result;
}