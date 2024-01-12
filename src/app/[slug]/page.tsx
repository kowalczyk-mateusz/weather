'use client';

import { Back } from '@/components/back';
import { CityNotFound } from '@/components/city-not-found';
import { Weather } from '@/components/weather';
import { WeatherForecastTable } from '@/components/weather-forecast-table';
import { useWeatherByCityName } from '@/hooks/api/use-weather-by-city-name';
import { useWeatherForecastByCityName } from '@/hooks/api/use-weather-forecast-by-city-name';

interface Props {
  params: {
    slug: string;
  };
}

export default function City({ params: { slug } }: Props) {
  const { data, isLoading } = useWeatherByCityName(slug);
  const { data: forecastData, isLoading: forecastIsLoading } =
    useWeatherForecastByCityName(slug);

  return (
    <main
      className={
        'flex min-h-screen flex-col bg-gradient-to-b from-blue-300 to-blue-500 px-2'
      }
    >
      {!isLoading && !data ? (
        <CityNotFound />
      ) : (
        <>
          <Back href='/' />
          <Weather isLoading={isLoading} data={data} />
          <WeatherForecastTable
            data={forecastData}
            isLoading={forecastIsLoading}
          />
        </>
      )}
    </main>
  );
}
