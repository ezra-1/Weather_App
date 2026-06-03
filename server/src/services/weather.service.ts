import axios from "axios";
import { env } from "../config/env";

export const getGeocoding = async (search: string) => {
  const { data } = await axios.get(
    `${env.WEATHER_BASE_URL}/geo/1.0/direct`,
    {
      params: {
        q: search,
        limit: 5,
        appid: env.WEATHER_API_KEY,
      },
    }
  );

  return data.map((location: any) => ({
    name: location.name,
    country: location.country,
    state: location.state,
    lat: location.lat,
    lon: location.lon,
  }));
};
