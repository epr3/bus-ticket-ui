import { thunk } from "easy-peasy";
import history from "../lib/history";

import { API } from "./index";

export default {
  authLoading: false,
  login: thunk(async (_, payload) => {
    const response = await API.postLogin(payload);
    localStorage.setItem(
      process.env.REACT_APP_ACCESS_TOKEN_PATH,
      response.data.access_token
    );
    history.replace("/");
  }),
  logout: thunk(() => {
    localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_PATH);
    history.replace("/login");
  })
};
