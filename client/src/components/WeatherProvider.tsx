import { APP, WEATHER_API } from "@/config/config";
import { openWeatherApi } from "@/api/weatherApi";

import { useState, useEffect, useCallback } from "react";

import {
  WeatherProviderContext,
  type Weather,
  type WeatherUnitType,
  type WeatherStateParam,
} from "@/components/WeatherContext";

import type { Geocoding, OneCallWeatherRes } from "@/types/weatherTypes";

export const WeatherProvider = ({ children }: React.PropsWithChildren) => {
  const defaultLat =
    Number(localStorage.getItem(APP.STORE_KEY.LAT)) || WEATHER_API.DEFAULTS.LAT;

  const defaultLon =
    Number(localStorage.getItem(APP.STORE_KEY.LON)) || WEATHER_API.DEFAULTS.LON;

  const defaultUnit =
    (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) ||
    WEATHER_API.DEFAULTS.UNIT;

  const [weather, setWeatherState] = useState<Weather | null>(null);

  const oneCall = useCallback(
    async (lat: number, lon: number, units: WeatherUnitType) => {
      const response = await openWeatherApi.get("/weather/onecall", {
        params: {
          lat,
          lon,
          units,
        },
      });

      return response.data as OneCallWeatherRes;
    },
    [],
  );

  const reverseGeo = useCallback(
    async (lat: number, lon: number, limit = 1) => {
      const response = await openWeatherApi.get("/weather/reversegeo", {
        params: {
          lat,
          lon,
          limit,
        },
      });

      return response.data as Geocoding[];
    },
    [],
  );

  const fetchWeather = useCallback(
    async ({
      lat = defaultLat,
      lon = defaultLon,
      unit = defaultUnit,
    }: WeatherStateParam): Promise<Weather> => {
      const [oneCallRes, reverseGeoRes] = await Promise.all([
        oneCall(lat, lon, unit),
        reverseGeo(lat, lon),
      ]);

      return {
        current: oneCallRes.current,
        minutely: oneCallRes.minutely,
        hourly: oneCallRes.hourly,
        daily: oneCallRes.daily,
        alerts: oneCallRes.alerts,
        location: reverseGeoRes[0],
        timezone: {
          timezone: oneCallRes.timezone,
          offset: oneCallRes.timezone_offset,
        },
      };
    },
    [defaultLat, defaultLon, defaultUnit, oneCall, reverseGeo],
  );

  const setWeather = useCallback(
    async (params: WeatherStateParam) => {
      const data = await fetchWeather(params);
      setWeatherState(data);
    },
    [fetchWeather],
  );

  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchWeather({});
      setWeatherState(data);
    };

    void loadWeather();
  }, [fetchWeather]);

  return (
    <WeatherProviderContext.Provider
      value={{
        weather,
        setWeather,
      }}
    >
      {children}
    </WeatherProviderContext.Provider>
  );
};
