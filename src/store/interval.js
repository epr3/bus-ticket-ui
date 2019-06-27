import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  intervalLoading: false,
  intervals: [],
  setIntervals: action((state, payload) => {
    state.intervals = [...payload];
  }),
  addInterval: action((state, payload) => {
    state.intervals.push(payload);
  }),
  updateInterval: action((state, payload) => {
    state.intervals = state.intervals.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  }),
  removeInterval: action((state, payload) => {
    state.intervals = state.intervals.filter(item => item.id !== payload);
  }),
  getIntervals: thunk(async actions => {
    const response = await API.getIntervals();
    actions.setIntervals(response.data);
  }),
  postInterval: thunk(async (actions, payload) => {
    const response = await API.postInterval(payload);
    actions.addInterval(response.data);
  }),
  putInterval: thunk(async (actions, payload) => {
    const response = await API.putInterval(payload);
    actions.updateInterval(response.data);
  }),
  deleteInterval: thunk(async (actions, payload) => {
    await API.deleteInterval(payload);
    actions.removeInterval(payload);
  })
};
