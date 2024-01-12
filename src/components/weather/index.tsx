import Image from 'next/image';
import toast from 'react-hot-toast';

import { WeatherSkeleton } from '@/components/weather/skeleton';
import { WeatherIconText } from '@/components/weather-icon-text';
import { Weather as WeatherType } from '@/types/responses/weather';

interface Props {
  isLoading: boolean;
  data: WeatherType | undefined;
}

const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Europe/Warsaw',
};

export const Weather = ({ data, isLoading }: Props) => {
  if (isLoading && !data) return <WeatherSkeleton />;

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(decodeURIComponent(window.location.href));
    toast.success('Copied to clipboard');
  };

  const sunriseTime = new Date(
    (data?.sys?.sunrise ?? 0) * 1000
  ).toLocaleTimeString('pl-PL', options);
  const sunsetTime = new Date(
    (data?.sys?.sunset ?? 0) * 1000
  ).toLocaleTimeString('pl-PL', options);

  return (
    <>
      <h1 className='flex items-center justify-center gap-2 text-center text-5xl font-bold text-white'>
        {data?.name}
        <div className='cursor-pointer'>
          <Image
            src='/icons/copy.svg'
            width={50}
            height={50}
            alt='copy icon'
            onClick={copyUrlToClipboard}
          />
        </div>
      </h1>

      <div className='mt-5 flex items-center justify-center gap-2'>
        <Image
          src={`https://openweathermap.org/img/wn/${
            data?.weather?.[0].icon ?? ''
          }@2x.png`}
          width={100}
          height={100}
          alt={`${data?.weather?.[0].description} icon`}
        />
        <p className='text-6xl font-bold text-white'>
          {(data?.main?.temp ?? 0).toFixed(1)}°C
        </p>
      </div>
      <WeatherIconText
        iconSrc='./icons/sunrise.svg'
        iconAlt='sunrise icon'
        text={`Sunrise at ${sunriseTime}`}
      />
      <WeatherIconText
        iconSrc='./icons/moon.svg'
        iconAlt='moon icon'
        text={`Sunset at ${sunsetTime}`}
      />
    </>
  );
};
