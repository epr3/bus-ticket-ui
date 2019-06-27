import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  cityLoading: false,
  cities: [],
  setCities: action((state, payload) => {
    state.cities = [...payload];
  }),
  addCity: action((state, payload) => {
    state.cities.push(payload);
  }),
  updateCity: action((state, payload) => {
    state.cities = state.cities.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  }),
  removeCity: action((state, payload) => {
    state.cities = state.cities.filter(item => item.id !== payload);
  }),
  getCities: thunk(async actions => {
    const response = await API.getCities();
    actions.setCities(response.data);
  }),
  postCity: thunk(async (actions, payload) => {
    const response = await API.postCity(payload);
    actions.addCity(response.data);
  }),
  putCity: thunk(async (actions, payload) => {
    const response = await API.putCity(payload);
    actions.updateCity(response.data);
  }),
  deleteCity: thunk(async (actions, payload) => {
    await API.deleteCity(payload);
    actions.removeCity(payload);
  })
};
