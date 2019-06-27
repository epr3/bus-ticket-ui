import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  busLoading: false,
  buses: [],
  setBuses: action((state, payload) => {
    state.buses = [...payload];
  }),
  addBus: action((state, payload) => {
    state.buses.push(payload);
  }),
  updateBus: action((state, payload) => {
    state.buses = state.buses.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  }),
  removeBus: action((state, payload) => {
    state.buses = state.buses.filter(item => item.id !== payload);
  }),
  getBuses: thunk(async actions => {
    const response = await API.getBuses();
    actions.setBuses(response.data);
  }),
  postBus: thunk(async (actions, payload) => {
    const response = await API.postBus(payload);
    actions.addBus(response.data);
  }),
  putBus: thunk(async (actions, payload) => {
    const response = await API.putBus(payload);
    actions.updateBus(response.data);
  }),
  deleteBus: thunk(async (actions, payload) => {
    await API.deleteBus(payload);
    actions.removeBus(payload);
  })
};
