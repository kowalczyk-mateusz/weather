'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Weather } from '@/components/weather';
import { WeatherForecastTable } from '@/components/weather-forecast-table';
import { useWeatherByCityName } from '@/hooks/use-weather-by-city-name';
import { useWeatherForecastByCityName } from '@/hooks/use-weather-forecast-by-city-name';

export default function City({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data, isLoading } = useWeatherByCityName(slug);
  const { data: forecastData, isLoading: forecastIsLoading } =
    useWeatherForecastByCityName(slug);

  return (
    <main
      className={clsx(
        'flex min-h-screen flex-col bg-gradient-to-b from-blue-300 to-blue-500'
      )}
    >
      {!isLoading && !data ? (
        <div className='mt-32 flex flex-col items-center justify-center text-white'>
          <Image src='/icons/sad.svg' width={150} height={150} alt='sad icon' />
          <h1 className='mb-4 text-center text-4xl font-bold'>
            City Not Found
          </h1>
          <p className='mb-8 text-center text-2xl'>
            Sorry, we couldn&apos;t find the city you were looking for.
          </p>
          <Link className='underline' href='/'>
            Go back to the home page
          </Link>
        </div>
      ) : (
        <>
          <Link href='/'>
            <div className='mt-10 flex items-center justify-center gap-2 text-white'>
              <Image
                src='/icons/back.svg'
                width={30}
                height={30}
                alt='back icon'
              />
              <p className='text-center'>Back</p>
            </div>
          </Link>
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
