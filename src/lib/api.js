import axios from "axios";
import { store } from "../index";

const create = (baseURL = process.env.REACT_APP_API_URL) => {
  const api = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });

  api.interceptors.request.use(
    config => {
      const token = localStorage.getItem(
        process.env.REACT_APP_ACCESS_TOKEN_PATH
      );
      if (token && config.url !== "/auth/login") {
        config.headers.Authorization = `JWT ${token}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );

  api.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    async error => {
      const status = error.response ? error.response.status : null;
      if (status === 401) {
        await store.getActions().auth.logout();
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );

  const postLogin = loginObj => api.post("/login", loginObj);

  return {
    postLogin
  };
};

export default create;
