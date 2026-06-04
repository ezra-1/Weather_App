import { WeatherProviderContext } from '@/components/WeatherContext';

/**
 * Hooks
 */
import { useContext } from 'react';

export const useWeather = () => {
  const context = useContext(WeatherProviderContext);

  if (context === undefined) {
    throw new Error('useWeather must be used withing a WeatherProvider');
  }

  return context;
};
