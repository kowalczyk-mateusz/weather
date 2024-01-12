import { useQuery } from '@tanstack/react-query';

import { weatherKeys } from '@/api/query-keys/weather-keys';
import weatherApi from '@/api/weather';
import { Weather } from '@/types/responses/weather';
import { WEATHER_STALE_TIME_IN_MILLISECONDS } from '@/utils/constants';

export const useWeatherByCityName = (cityName: string) => {
  const normalizedCityName = decodeURIComponent(cityName);

  return useQuery<Weather>({
    queryKey: weatherKeys.detail(normalizedCityName),
    queryFn: () => weatherApi.fetchWeatherByCityName(normalizedCityName),
    enabled: !!cityName,
    staleTime: WEATHER_STALE_TIME_IN_MILLISECONDS,
  });
};
