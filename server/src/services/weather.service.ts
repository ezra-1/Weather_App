import axios from "axios";
import { env } from "../config/env";
import { WeatherResponse } from "../types/weather.types";

export const getWeatherByCity = async (city: string) => {
  const url = `${env.WEATHER_BASE_URL}/data/2.5/weather`;

  const response = await axios.get<WeatherResponse>(url, {
    params: {
      q: city,
      appid: env.WEATHER_API_KEY,
      units: "metric"
    }
  });

  return response.data;
};
