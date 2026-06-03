import axios from "axios";
import { env } from "../config/env";

export const getGeocoding = async (search: string) => {
  const { data } = await axios.get(
    `${env.WEATHER_BASE_URL}/geo/1.0/direct`,
    {
      params: {
        q: search,
        appid: env.WEATHER_API_KEY,
      },
    }
  );

  return data
};
