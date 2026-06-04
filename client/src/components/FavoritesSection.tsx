import { useEffect, useState } from "react";
import type { Geocoding } from "@/types/weatherTypes";

import {
  getFavorites,
  subscribeFavorites,
  removeFavorite,
} from "@/utils/favorites";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MapPinnedIcon, Trash2Icon } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";

export const FavoritesSection = () => {
  const { setWeather } = useWeather();
  const [favorites, setFavorites] = useState<Geocoding[]>(() => getFavorites());

  useEffect(() => {
    const unsubscribe = subscribeFavorites(() => {
      setFavorites(getFavorites());
    });

    return unsubscribe;
  }, []);

  if (!favorites.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
        <p className="text-sm text-muted-foreground">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4 pt-4">
          {favorites.map((f) => (
            <div
              key={`${f.lat}-${f.lon}`}
              className="flex gap-4 items-center justify-between p-2 border rounded"
            >
              <div>
                <div className="font-medium">{f.name}</div>
                <div className="text-xs text-muted-foreground">
                  {f.state ? `${f.state}, ` : ""}
                  {f.country}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setWeather({ lat: f.lat, lon: f.lon })}
                >
                  <MapPinnedIcon className="" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFavorite(f.lat, f.lon)}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </div>
  );
};
