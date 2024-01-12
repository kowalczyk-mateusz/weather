import Image from 'next/image';
import toast from 'react-hot-toast';

import { Weather as WeatherType } from '@/types/responses/weather';

import { WeatherSkeleton } from './skeleton';

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
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard');
  };

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
      <div className='mt-4 flex items-center justify-center gap-4'>
        <Image
          src='./icons/sunrise.svg'
          width={30}
          height={30}
          alt='sunrise icon'
        />
        <p className='text-xl text-white'>
          Sunrise at{' '}
          {new Date((data?.sys?.sunrise ?? 0) * 1000).toLocaleTimeString(
            'pl-PL',
            options
          )}
        </p>
      </div>
      <div className='mt-2 flex items-center justify-center gap-4'>
        <Image src='./icons/moon.svg' width={30} height={30} alt='moon icon' />
        <p className='text-xl text-white'>
          Sunset at
          {new Date((data?.sys?.sunset ?? 0) * 1000).toLocaleString(
            'pl-PL',
            options
          )}
        </p>
      </div>
    </>
  );
};
