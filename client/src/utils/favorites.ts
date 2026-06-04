import type { Geocoding } from "@/types/weatherTypes";

const FAVORITES_KEY = "weather-favorites";

/**
 * Internal listeners
 */
type Listener = () => void;
const listeners: Listener[] = [];

const emitChange = () => {
  listeners.forEach((l) => l());
};

export const subscribeFavorites = (listener: Listener) => {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) listeners.splice(index, 1);
  };
};

export const getFavorites = (): Geocoding[] => {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (location: Geocoding) => {
  const favorites = getFavorites();

  const exists = favorites.some(
    (item) =>
      item.lat === location.lat &&
      item.lon === location.lon
  );

  if (exists) return;

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify([...favorites, location])
  );

  emitChange();
};

export const removeFavorite = (lat: number, lon: number) => {
  const favorites = getFavorites();

  const filtered = favorites.filter(
    (item) =>
      !(item.lat === lat && item.lon === lon)
  );

  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(filtered)
  );

  emitChange();
};
