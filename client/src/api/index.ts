import axios from "axios";

export const openWeatherApi = axios.create({
  baseURL: "http://localhost:3000/api/",
});
