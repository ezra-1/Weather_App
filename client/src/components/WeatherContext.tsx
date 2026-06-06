import { createContext } from 'react';

import type { Geocoding } from '@/types/weatherTypes';
import type {
  CurrentWeather,
  MinutelyForecast,
  HourlyForecast,
  DailyForecast,
  Alert,
  WeatherTimezone,
} from '@/types/weatherTypes';

export type Weather = {
  current: CurrentWeather;
  minutely: MinutelyForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: Alert[];
  location: Geocoding;
  timezone: WeatherTimezone;
};

export type WeatherUnitType = 'metric' | 'imperial';

export type WeatherStateParam = {
  lat?: number;
  lon?: number;
  unit?: WeatherUnitType;
};

export type WeatherProviderState = {
  weather: Weather | null;
  setWeather: (weather: WeatherStateParam) => void;
};

const initialState: WeatherProviderState = {
  weather: null,
  setWeather: () => null,
};

export const WeatherProviderContext =
  createContext<WeatherProviderState>(initialState);
