import { useMutation } from '@tanstack/react-query';

import { fetchWeatherByCityCords } from '@/api/weather';

export const useCityNameByCords = () => {
  return useMutation({
    mutationFn: ({ lat, lon }: { lat: number; lon: number }) =>
      fetchWeatherByCityCords(lat, lon),
  });
};
