import { useEffect, useState } from "react";
import { HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Geocoding } from "@/types/weatherTypes";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
  subscribeFavorites,
} from "@/utils/favorites";

type Props = {
  location: Geocoding;
};

export const FavoriteButton = ({ location }: Props) => {
  const [favorites, setFavorites] = useState<Geocoding[]>(() => getFavorites());

  useEffect(() => {
    const unsubscribe = subscribeFavorites(() => {
      setFavorites(getFavorites());
    });

    return unsubscribe;
  }, []);

  const isFavorite = favorites.some(
    (item) => item.lat === location.lat && item.lon === location.lon,
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(location.lat, location.lon);
    } else {
      addFavorite(location);
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleFavorite}>
      <HeartIcon
        className={`transition-colors duration-200 ${isFavorite ? "text-red-500 fill-red-500" : "text-muted-foreground"
          }`}
      />
    </Button>
  );
};
