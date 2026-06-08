import mapboxgl from "mapbox-gl";
import { MAPBOX } from "@/config/config";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { useWeather } from "@/hooks/useWeather";
import { Marker } from "@/components/Marker";
import type { LngLatLike, Map as MapType } from "mapbox-gl";

export const Map = () => {
  const { theme } = useTheme();
  const { weather } = useWeather();

  const center = useMemo<LngLatLike>(
    () =>
      weather
        ? [weather.location.lon, weather.location.lat]
        : MAPBOX.DEFAULTS.CENTER,
    [weather],
  );

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !center) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    setMap(
      new mapboxgl.Map({
        container: mapContainerRef.current,
        center,
        zoom: MAPBOX.DEFAULTS.ZOOM,
        config: {
          basemap: {
            lightPreset: theme === "light" ? "day" : "night",
          },
        },
      }),
    );

    return () => map?.remove();
  }, [theme, center]);

  return (
    <div
      ref={mapContainerRef}
      className="bg-card text-card-foreground rounded-xl border overflow-hidden shadow-sm"
    >
      {map && <Marker map={map} coordinates={center} />}
    </div>
  );
};
