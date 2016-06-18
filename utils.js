/**
 * Created by thram on 14/04/16.
 */
import {zipObject, isString, map, uniqueId, assign} from "lodash";

export function Enum(keys, prefix) {
  return zipObject(keys, prefix && isString(prefix) ? map(keys, function (key) {
    return uniqueId(`@@${prefix}/${key}_`);
  }) : keys);
}

export function Payload(type, payload) {
  return assign({}, {type: type, payload: payload});
}

export function isEvent(obj) {
  if (!obj) return false;
  let s   = obj.toString(),
      ptr = document.all ? /\[object Event\]/ : /\[object (Keyboard|Mouse|Focus|Wheel|Composition|Storage)Event\]/;
  return ptr.test(s);
}