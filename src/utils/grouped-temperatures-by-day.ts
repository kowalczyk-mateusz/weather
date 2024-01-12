import { WeatherForecastList } from '@/types/responses/weather-forecast';

import { getDayOfWeek } from './get-day-of-the-week';
import { isToday } from './is-today';

interface TemperatureStats {
  temps: number[];
  minTemp: number;
  maxTemp: number;
  avgTemp: number;
}

interface GroupedTemperatures {
  [key: string]: TemperatureStats;
}

interface ListItem {
  main: { temp: number };
  dt_txt: string;
}

export interface WeatherForecastByDay {
  dayName: string;
  minTemp: string;
  maxTemp: string;
  avgTemp: string;
}

export const groupTemperaturesByDay = (
  data: WeatherForecastList[]
): WeatherForecastByDay[] => {
  const groupedTemperaturesByDay = data.reduce(
    (acc: GroupedTemperatures, item: ListItem) => {
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
};
