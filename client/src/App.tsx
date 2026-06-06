import { ThemeProvider } from "@/components/ThemeProvider";
import { WeatherProvider } from "@/components/WeatherProvider";
import { TopAppBar } from "@/components/TopAppBar";
import { FavoritesSection } from "@/components/FavoritesSection";
import { PageHeader } from "./components/PageHeader";
import { CurrentWeatherCard } from "./components/CurrentWeatherCard";
import { Map } from "@/components/Map";

const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />
        <FavoritesSection />
        <main className="py-4">
          <div className="container">
            {/* Page header */}
            <PageHeader />

            {/* Current weather card & map */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CurrentWeatherCard />

              <Map />
            </div>
          </div>
        </main>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default App;
