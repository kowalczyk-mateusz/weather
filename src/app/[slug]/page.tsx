'use client';
import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Weather } from '@/types/responses/weather';

const options: any = {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Europe/Warsaw',
};

// 'https://openweathermap.org/img/wn/10d@2x.png'
export default function City() {
  const pathname = usePathname();
  console.log(pathname);
  const [state, setState] = useState<Weather | null>(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(
      //TODO: UPDATE API KEY
      `https://api.openweathermap.org/data/2.5/weather?q=dsadas&appid=6b02609742a62ba4ef0e4dc3a106a5d0&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setState(data);
      });
  };

  return (
    <main
      className={clsx(
        'flex min-h-screen flex-col bg-gradient-to-b from-blue-300 to-blue-500'
      )}
    >
      <h1 className='mt-10 text-center text-5xl font-bold text-white'>
        {state?.name}
      </h1>
      <div className='mt-5 flex items-center justify-center gap-2'>
        <Image
          src={`https://openweathermap.org/img/wn/${
            state?.weather?.[0].icon ?? ''
          }@2x.png`}
          width={100}
          height={100}
          alt={`${state?.weather?.[0].description} icon`}
        />
        <p className='text-6xl font-bold text-white'>
          {(state?.main?.temp ?? 0).toFixed(1)}°C
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
          {new Date((state?.sys?.sunrise ?? 0) * 1000).toLocaleTimeString(
            'pl-PL',
            options
          )}
        </p>
      </div>
      <div className='mt-2 flex items-center justify-center gap-4'>
        <Image src='./icons/moon.svg' width={30} height={30} alt='moon icon' />
        <p className='text-xl text-white'>
          Sunset at
          {new Date((state?.sys?.sunset ?? 0) * 1000).toLocaleString(
            'pl-PL',
            options
          )}
        </p>
      </div>
      <p className='mt-6 text-center text-3xl font-bold text-white'>
        Next 5 Days Forecast
      </p>
      <div className='flex justify-center'>
        <div className='mt-2 w-full max-w-md'>
          <table className='w-full overflow-hidden rounded-lg bg-white text-center text-black'>
            <thead className='bg-blue-500 text-white'>
              <tr>
                <th className='p-2'>Day</th>
                <th className='p-2'>Temperature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='p-2'>Monday</td>
                <td className='p-2'>
                  <div className='flex items-center justify-center'>
                    <Image
                      src={`https://openweathermap.org/img/wn/${
                        state?.weather?.[0].icon ?? ''
                      }@2x.png`}
                      width={40}
                      height={40}
                      alt={`${state?.weather?.[0].description} icon`}
                    />
                    22°C
                  </div>
                </td>
              </tr>
              <tr className='bg-blue-100'>
                <td className='p-2'>Tuesday</td>
                <td className='p-2'>24°C</td>
              </tr>
              <tr>
                <td className='p-2'>Wednesday</td>
                <td className='p-2'>23°C</td>
              </tr>
              <tr className='bg-blue-100'>
                <td className='p-2'>Thursday</td>
                <td className='p-2'>25°C</td>
              </tr>
              <tr>
                <td className='p-2'>Friday</td>
                <td className='p-2'>24°C</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
