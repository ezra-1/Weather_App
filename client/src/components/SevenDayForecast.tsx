import { useMemo } from "react";
import { useWeather } from "@/hooks/useWeather";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export const SevenDayForecast = () => {
  const { weather } = useWeather();

  const temperatures = useMemo(() => {
    return weather?.daily.slice(0, 7) ?? [];
  }, [weather]);

  if (!weather) {
    return <Skeleton className="h-[420px] w-full rounded-xl" />;
  }

  const globalMin = Math.min(
    ...temperatures.map((day) => day.temp.min)
  );

  const globalMax = Math.max(
    ...temperatures.map((day) => day.temp.max)
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>7-Day Forecast</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {temperatures.map((day) => {
            const min = Math.round(day.temp.min);
            const max = Math.round(day.temp.max);

            const left =
              ((min - globalMin) /
                (globalMax - globalMin)) *
              100;

            const width =
              ((max - min) /
                (globalMax - globalMin)) *
              100;

            return (
              <div
                key={day.dt}
                className="flex items-center gap-4"
              >
                <div className="w-12 text-sm font-medium">
                  {new Date(day.dt * 1000).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                    }
                  )}
                </div>

                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                  className="h-10 w-10"
                />

                <span className="w-8 text-right text-sm text-muted-foreground">
                  {min}°
                </span>

                <div className="relative h-2 flex-1 rounded-full bg-muted">
                  <div
                    className="absolute h-2 rounded-full bg-primary"
                    style={{
                      left: `${left}%`,
                      width: `${width}%`,
                    }}
                  />
                </div>

                <span className="w-8 text-sm font-semibold">
                  {max}°
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
