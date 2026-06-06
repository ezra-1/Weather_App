import axios from "axios";
import { env } from "../config/env";

export const getGeocoding = async (search: string, limit: number) => {
  const { data } = await axios.get(`${env.WEATHER_BASE_URL}/geo/1.0/direct`, {
    params: {
      q: search,
      limit: limit,
      appid: env.WEATHER_API_KEY,
    },
  });

  return data;
};

export const getOneCall = async (lat: number, lon: number, units: string) => {
  const { data } = await axios.get(`${env.WEATHER_BASE_URL}/data/3.0/onecall`, {
    params: {
      lat,
      lon,
      units,
      appid: env.WEATHER_API_KEY,
    },
  });

  return data;
};

export const getReverseGeo = async (lat: number, lon: number) => {
  const { data } = await axios.get(`${env.WEATHER_BASE_URL}/geo/1.0/reverse`, {
    params: {
      lat,
      lon,
      appid: env.WEATHER_API_KEY,
    },
  });

  return data;
};
