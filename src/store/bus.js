import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  busLoading: false,
  buses: [],
  getBuses: thunk(async actions => {
    const response = await API.getBuses();
    actions.setBuses(response.data);
  }),
  setBuses: action((state, payload) => {
    state.buses = [...payload];
  })
};
