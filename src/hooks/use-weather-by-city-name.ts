import { useQuery } from '@tanstack/react-query';

import { weatherKeys } from '@/api/query-keys/weather-keys';
import weatherApi from '@/api/weather';
import { Weather } from '@/types/responses/weather';

import { STALE_TIME_IN_MILLISECONDS } from './use-weather-forecast-by-city-name';

export const useWeatherByCityName = (cityName: string) => {
  const normalizedCityName = decodeURIComponent(cityName);
  // const normalizedCityName = escapeDiacritics(cityName);

  return useQuery<Weather>({
    queryKey: weatherKeys.detail(normalizedCityName),
    queryFn: () => weatherApi.fetchWeatherByCityName(normalizedCityName),
    enabled: !!cityName,
    staleTime: STALE_TIME_IN_MILLISECONDS,
  });
};
