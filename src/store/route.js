import { thunk, action } from "easy-peasy";

import { API } from "./index";

export default {
  routeLoading: false,
  routes: [],
  setRoutes: action((state, payload) => {
    state.routes = [...payload];
  }),
  addRoute: action((state, payload) => {
    state.routes.push(payload);
  }),
  updateRoute: action((state, payload) => {
    state.routes = state.routes.map(item => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
  }),
  removeRoute: action((state, payload) => {
    state.routes = state.routes.filter(item => item.id !== payload);
  }),
  getRoutes: thunk(async actions => {
    const response = await API.getRoutes();
    actions.setRoutes(response.data);
  }),
  postRoute: thunk(async (actions, payload) => {
    const response = await API.postRoute(payload);
    actions.addRoute(response.data);
  }),
  putRoute: thunk(async (actions, payload) => {
    const response = await API.putRoute(payload);
    actions.updateRoute(response.data);
  }),
  deleteRoute: thunk(async (actions, payload) => {
    await API.deleteRoute(payload);
    actions.removeRoute(payload);
  })
};
