import { thunk, action } from "easy-peasy";

import history from "../lib/history";

import { API } from "./index";

export default {
  authLoading: false,
  profile: null,
  login: thunk(async (_, payload) => {
    const response = await API.postLogin(payload);
    await localStorage.setItem(
      process.env.REACT_APP_ACCESS_TOKEN_PATH,
      response.data.token
    );
    await history.replace("/");
  }),
  register: thunk(async (_, payload) => {
    const response = await API.postRegister(payload);
    await localStorage.setItem(
      process.env.REACT_APP_ACCESS_TOKEN_PATH,
      response.data.token
    );
    history.replace("/");
  }),
  logout: thunk(async () => {
    localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_PATH);
    history.replace("/login");
  }),
  saveUser: action((state, payload) => {
    state.profile = { ...payload };
  }),
  getUser: thunk(async actions => {
    const response = await API.getProfile();
    actions.saveUser(response.data);
  })
};
