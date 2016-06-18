/**
 * Created by thram on 16/06/16.
 */
import configureStore from "./store";
import {payload as mapPayload, actions as mapActions} from "toolbox/maps";

export default {
  init: function () {
    let tag     = this;
    tag.state   = tag.opts.state || {};
    const store = configureStore(tag.state);
    tag.actions = mapActions(tag.opts.actions, store.dispatch);

    tag.on('mount', () => {
      tag.unsubscribe = store.subscribe(() => {
        tag.update({state: Object.assign(tag.state, mapPayload(store.getState()))});
      });
    });

    tag.on('unmount', () => tag.unsubscribe());
  }
};