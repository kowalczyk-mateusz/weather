'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

import { useCityNameByCords } from '@/hooks/use-city-by-cords';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function Home() {
  const [search, setSearch] = useState('');

  const { getLocation, isLoading } = useCurrentLocation();

  const { mutateAsync: getCityNameByCords, isPending } = useCityNameByCords();

  const { cities, addToLocalStorage, removeFromLocalStorage } =
    useLocalStorage('cities');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddCityToLocalStorage = async () => {
    if (search.length <= 0) return;

    addToLocalStorage(search);
    setSearch('');
  };

  const addCityFromCordsToLocalStorage = async () => {
    const { lat, lon } = await getLocation();

    if (!lat || !lon) {
      return;
    }

    const data = await getCityNameByCords({
      lat: lat,
      lon: lon,
    });

    if (data) {
      addToLocalStorage(data?.name);
    }
  };

  return (
    <main className='flex min-h-screen justify-center'>
      <div className='mt-10 w-full max-w-96'>
        <h1 className='mb-10 text-center text-3xl font-bold'>Cities</h1>
        <form
          className='flex w-full gap-2'
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCityToLocalStorage();
          }}
        >
          <input
            className='w-full rounded-md border border-solid border-gray-200 px-4'
            placeholder='Add city'
            value={search}
            onChange={handleChange}
          ></input>
          <button
            className='rounded-md bg-black px-4 py-2 font-medium text-white'
            onClick={handleAddCityToLocalStorage}
          >
            Add
          </button>
        </form>
        <button
          className={clsx(
            'mt-2 w-full rounded-md border border-solid border-gray-200 bg-white px-4 py-2 font-medium text-black',
            isPending || isLoading ? 'cursor-not-allowed opacity-50  ' : ''
          )}
          onClick={addCityFromCordsToLocalStorage}
          disabled={isPending || isLoading}
        >
          {isPending || isLoading ? 'Loading...' : 'Request current location'}
        </button>
        <ul className='mt-4 flex flex-col gap-2'>
          {cities.map((city) => (
            <li
              key={city}
              className='flex h-14 w-full items-center justify-between rounded-md  bg-white px-4 text-black shadow-md'
            >
              <Link href={city.toLocaleLowerCase()}>{city}</Link>
              <Image
                src='/icons/delete.svg'
                width={30}
                height={30}
                alt='delete icon'
                className='cursor-pointer'
                onClick={() => removeFromLocalStorage(city)}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
