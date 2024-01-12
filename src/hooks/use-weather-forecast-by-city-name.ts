import { useQuery } from '@tanstack/react-query';

import { weatherKeys } from '@/api/query-keys/weather-keys';
import weatherApi from '@/api/weather';
import { WeatherForecast } from '@/types/responses/weather-forecast';
import { WEATHER_STALE_TIME_IN_MILLISECONDS } from '@/utils/constants';
import {
  WeatherForecastByDay,
  groupTemperaturesByDay,
} from '@/utils/grouped-temperatures-by-day';

export const useWeatherForecastByCityName = (cityName: string) => {
  const normalizedCityName = decodeURIComponent(cityName);

  return useQuery<WeatherForecast, unknown, WeatherForecastByDay[]>({
    queryKey: weatherKeys.list(normalizedCityName),
    queryFn: () =>
      weatherApi.fetchWeatherForecastByCityName(normalizedCityName),
    enabled: !!cityName,
    select: (data) => groupTemperaturesByDay(data.list),
    staleTime: WEATHER_STALE_TIME_IN_MILLISECONDS,
  });
};
