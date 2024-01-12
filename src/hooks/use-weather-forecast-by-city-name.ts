import { useQuery } from '@tanstack/react-query';

import { weatherKeys } from '@/api/query-keys/weather-keys';
import weatherApi from '@/api/weather';
import { WeatherForecast } from '@/types/responses/weather-forecast';
import { escapeDiacritics } from '@/utils/escape-diacritics';
import { getDayOfWeek } from '@/utils/formated-day';
import { isToday } from '@/utils/is-today';

interface TemperatureStats {
  temps: number[];
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
}

interface GroupedTemperatures {
  [key: string]: TemperatureStats;
}

interface ListEntry {
  main: { temp: number };
  dt_txt: string;
}

export interface WeatherForecastByDay {
  dayName: string;
  minTemp: string;
  maxTemp: string;
  avgTemp: string;
}

export const STALE_TIME_IN_MILLISECONDS = 300000;

export const useWeatherForecastByCityName = (cityName: string) => {
  const normalizedCityName = escapeDiacritics(cityName);

  return useQuery<WeatherForecast, unknown, WeatherForecastByDay[]>({
    queryKey: weatherKeys.list(normalizedCityName),
    queryFn: () =>
      weatherApi.fetchWeatherForecastByCityName(normalizedCityName),
    enabled: !!cityName,
    select: (data) => {
      const groupedTemperaturesByDay = data.list.reduce(
        (acc: GroupedTemperatures, item: ListEntry) => {
          if (isToday(new Date(item.dt_txt))) return acc;

          const dayName = getDayOfWeek(new Date(item.dt_txt));

          if (!acc[dayName]) {
            acc[dayName] = {
              temps: [],
              minTemp: 0,
              maxTemp: 0,
              avgTemp: 0,
            };
          }

          acc[dayName].temps.push(item.main.temp);

          return acc;
        },
        {}
      );

      return Object.keys(groupedTemperaturesByDay).map((dayName) => {
        const { temps } = groupedTemperaturesByDay[dayName];
        const totalTemp = temps.reduce((a: number, b: number) => a + b, 0);

        return {
          dayName,
          minTemp: Math.min(...temps).toFixed(1),
          maxTemp: Math.max(...temps).toFixed(1),
          avgTemp: (totalTemp / temps.length).toFixed(1),
        };
      });
    },
    staleTime: STALE_TIME_IN_MILLISECONDS,
  });
};
