import { useMutation } from '@tanstack/react-query';

import { fetchWeatherByCityName } from '@/api/weather';

export const useCheckIfCityExists = () => {
  return useMutation({
    mutationFn: (cityName: string) => fetchWeatherByCityName(cityName),
  });
};
