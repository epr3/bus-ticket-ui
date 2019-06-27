import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  amenityLoading: false,
  amenities: [],
  setAmenities: action((state, payload) => {
    state.amenities = [...payload];
  }),
  addAmenity: action((state, payload) => {
    state.amenities.push(payload);
  }),
  updateAmenity: action((state, payload) => {
    state.amenities = state.amenities.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  }),
  removeAmenity: action((state, payload) => {
    state.amenities = state.amenities.filter(item => item.id !== payload);
  }),
  getAmenities: thunk(async actions => {
    const response = await API.getAmenities();
    actions.setAmenities(response.data);
  }),
  postAmenity: thunk(async (actions, payload) => {
    const response = await API.postAmenity(payload);
    actions.addAmenity(response.data);
  }),
  putAmenity: thunk(async (actions, payload) => {
    const response = await API.putAmenity(payload);
    actions.updateAmenity(response.data);
  }),
  deleteAmenity: thunk(async (actions, payload) => {
    await API.deleteAmenity(payload);
    actions.removeAmenity(payload);
  })
};
