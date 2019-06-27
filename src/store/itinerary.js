import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  itineraryLoading: false,
  itineraries: [],
  setItineraries: action((state, payload) => {
    state.itineraries = [...payload];
  }),
  addItinerary: action((state, payload) => {
    state.itineraries.push(payload);
  }),
  updateItinerary: action((state, payload) => {
    state.itineraries = state.itineraries.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  }),
  removeItinerary: action((state, payload) => {
    state.itineraries = state.itineraries.filter(item => item.id !== payload);
  }),
  getItineraries: thunk(async actions => {
    const response = await API.getItineraries();
    actions.setItineraries(response.data);
  }),
  postItinerary: thunk(async (actions, payload) => {
    const response = await API.postItinerary(payload);
    actions.addItinerary(response.data);
  }),
  putItinerary: thunk(async (actions, payload) => {
    const response = await API.putItinerary(payload);
    actions.updateItinerary(response.data);
  }),
  deleteItinerary: thunk(async (actions, payload) => {
    await API.deleteItinerary(payload);
    actions.removeItinerary(payload);
  })
};
