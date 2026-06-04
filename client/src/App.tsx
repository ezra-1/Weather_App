import { ThemeProvider } from "@/components/ThemeProvider";
import { WeatherProvider } from "@/components/WeatherProvider";
import { TopAppBar } from "@/components/TopAppBar";
import { FavoritesSection } from "@/components/FavoritesSection";

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />
        <FavoritesSection />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
