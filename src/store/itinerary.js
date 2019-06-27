import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  itineraryLoading: false,
  itineraries: [],
  getItineraries: thunk(async actions => {
    const response = await API.getItineraries();
    actions.setItineraries(response.data);
  }),
  setItineraries: action((state, payload) => {
    state.itineraries = [...payload];
  })
};
