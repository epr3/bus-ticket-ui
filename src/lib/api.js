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
        config.headers.Authorization = `Bearer ${token}`;
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

  const postLogin = loginObj => api.post("/auth/login", loginObj);
  const postRegister = registerObj => api.post("/auth/register", registerObj);
  const getProfile = () => api.get("/profile/me");

  const getItineraries = () => api.get("/itineraries");
  const postItinerary = itineraryObj => api.post("/itineraries", itineraryObj);
  const putItinerary = itineraryObj =>
    api.put(`/itineraries/${itineraryObj.id}`, itineraryObj);
  const deleteItinerary = id => api.delete(`/itineraries/${id}`);

  const getBuses = () => api.get("/buses");
  const postBus = busObj => api.post("/buses", busObj);
  const putBus = busObj => api.put(`/buses/${busObj.id}`, busObj);
  const deleteBus = id => api.delete(`/buses/${id}`);

  const getCities = () => api.get("/cities");
  const postCity = cityObj => api.post("/cities", cityObj);
  const putCity = cityObj => api.put(`/cities/${cityObj.id}`, cityObj);
  const deleteCity = id => api.delete(`/cities/${id}`);

  return {
    postLogin,
    postRegister,
    getProfile,
    getItineraries,
    postItinerary,
    putItinerary,
    deleteItinerary,
    getBuses,
    postBus,
    putBus,
    deleteBus,
    getCities,
    postCity,
    putCity,
    deleteCity
  };
};

export default create;
