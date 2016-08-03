/**
 * Created by thram on 16/06/16.
 */
import configureStore from "./store";
import {payload as mapPayload, actions as mapActions} from "./maps";
import {assign, set} from "lodash";
import {toNumber, isEvent, stopEvent} from "./utils";

export default {
  init: function () {
    let tag        = this;
    tag.INIT_STATE = tag.INIT_STATE || {};
    tag.state      = assign({}, tag.INIT_STATE, tag.opts.state);
    const reducer  = (state, action)=> {
      if (tag.reducer) action.payload = tag.reducer(state, action);
      if (tag.opts.reducer) action.payload = tag.opts.reducer(state, action);
      return action;
    };
    const STORE    = configureStore(tag.state, reducer);

    tag.change = (path, isNumber) => (o) => {
      let value;
      if (isEvent(o)) {
        stopEvent(o);
        value = o.target.value;
      } else {
        value = o;
      }
      return tag.actions.changeAttr({path: path, value: isNumber ? toNumber(value) : value});
    };

    tag.onChange = (attr) => (ev) => {
      stopEvent(ev);
      return tag.actions.update({attr: attr, value: ev.target.value});
    };

    tag.actions = mapActions({
      id      : tag.opts.name ? tag.opts.name : `${tag.root.tagName.toLowerCase()}-${tag._riot_id}`,
      methods : assign(tag.actions || {}, {
        update    : (options) => options || tag.state,
        refresh   : () => tag.opts.state || tag.INIT_STATE,
        changeAttr: (options) => options.path ? set({}, options.path, options.value) : options.value
      }, tag.opts.actions),
      dispatch: STORE.dispatch
    });

    tag.on('mount', () => {
      tag.unsubscribe = STORE.subscribe(() => {
        const payload = mapPayload(STORE.getState());
        tag.update({state: assign({}, tag.state, payload)});
        tag.opts.onchange && tag.opts.onchange.call(tag, payload);
      });
    });

    tag.refresh = ()=> tag.update({state: tag.opts.state || tag.INIT_STATE});

    tag.value = () => tag.state;

    tag.on('unmount', () => tag.unsubscribe());
  }
};