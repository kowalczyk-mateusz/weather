import { useMutation } from '@tanstack/react-query';

import weatherApi from '@/api/weather';

export const useCityNameByCords = () => {
  return useMutation({
    mutationFn: ({ lat, lon }: { lat: number; lon: number }) =>
      weatherApi.fetchWeatherByCityCords(lat, lon),
  });
};
