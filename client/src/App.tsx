import { ThemeProvider } from "@/components/ThemeProvider";
import { WeatherProvider } from "@/components/WeatherProvider";
import { TopAppBar } from "@/components/TopAppBar";
import { FavoritesSection } from "@/components/FavoritesSection";
import { PageHeader } from "./components/PageHeader";
import { CurrentWeatherCard } from "./components/CurrentWeatherCard";
import { HourlyWeatherTabs } from "@/components/HourlyWeatherTabs";
import { Map } from "@/components/Map";
import { SevenDayForecast } from "./components/SevenDayForecast";

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />
        <FavoritesSection />
        <main className="py-4 ">
          <div className="container">
            <PageHeader />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CurrentWeatherCard />
              <Map />
              <HourlyWeatherTabs />
              <SevenDayForecast />
            </div>
          </div>
        </main>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;
