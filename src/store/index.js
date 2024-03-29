import api from "../lib/api";

import modal from "./modal";

import auth from "./auth";
import itinerary from "./itinerary";
import bus from "./bus";
import city from "./city";
import route from "./route";
import amenity from "./amenity";
import interval from "./interval";

export const API = api();

export default {
  auth,
  itinerary,
  modal,
  bus,
  city,
  route,
  amenity,
  interval
};
