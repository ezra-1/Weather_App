import { openWeatherApi } from "@/api/weatherApi";
import { APP, WEATHER_API } from "@/config/config";

import { useEffect, useCallback, useState } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
} from "@/components/ui/item";

import { MapPinnedIcon, SearchIcon } from "lucide-react";

import type { Geocoding } from "@/types/weatherTypes";

import { FavoriteButton } from "@/components/FavoriteButton";

export const SearchDialog = () => {
  const { setWeather } = useWeather();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Geocoding[]>([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const geocoding = useCallback(async (search: string) => {
    if (!search) return;

    const response = await openWeatherApi.get("/weather", {
      params: {
        q: search,
        limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
      },
    });

    return response.data as Geocoding[];
  }, []);

  useEffect(() => {
    if (!search) return;

    (async () => {
      const data = await geocoding(search);
      if (data) setResults(data);
    })();
  }, [search, geocoding]);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setSearchDialogOpen(true);
      }
    };

    document.addEventListener("keydown", shortcut);
    return () =>
      document.removeEventListener("keydown", shortcut);
  }, []);

  return (
    <Dialog
      open={searchDialogOpen}
      onOpenChange={setSearchDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="me-auto max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50"
        >
          <SearchIcon />

          <div className="flex justify-between w-[250px] max-lg:hidden">
            Search weather...
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 bg-card gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search weather</DialogTitle>
          <DialogDescription>
            Search weather by city or country
          </DialogDescription>
        </DialogHeader>

        <InputGroup>
          <InputGroupInput
            placeholder="Search weather..."
            value={search}
            onInput={(e) =>
              setSearch(e.currentTarget.value)
            }
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <ItemGroup className="min-h-80 p-2">
          {!results.length && (
            <p className="text-center text-sm py-4">
              No results found!
            </p>
          )}

          {results.map(
            ({ name, lat, lon, state, country }) => (
              <Item
                key={`${name}-${lat}-${lon}`}
                className="relative p-2"
              >
                <ItemContent>
                  <ItemTitle>{name}</ItemTitle>
                  <ItemDescription>
                    {state ? `${state}, ` : ""}
                    {country}
                  </ItemDescription>
                </ItemContent>

                <ItemActions>
                  <DialogClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setWeather({ lat, lon });

                        localStorage.setItem(
                          APP.STORE_KEY.LAT,
                          lat.toString()
                        );

                        localStorage.setItem(
                          APP.STORE_KEY.LON,
                          lon.toString()
                        );
                      }}
                    >
                      <MapPinnedIcon />
                    </Button>
                  </DialogClose>

                  <FavoriteButton
                    location={{
                      name,
                      lat,
                      lon,
                      state,
                      country,
                    }}
                  />
                </ItemActions>
              </Item>
            )
          )}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  );
};
