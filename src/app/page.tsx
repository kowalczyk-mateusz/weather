'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Cities } from '@/components/cities';
import { Search } from '@/components/search';
import { useCheckIfCityExists } from '@/hooks/api/use-check-if-city-exists';
import { useCityNameByCords } from '@/hooks/api/use-city-by-cords';
import { useCitiesLocalStorage } from '@/hooks/use-cities-local-storage';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { ApiError } from '@/types/responses/api-error';

export default function Home() {
  const [query, setQuery] = useState('');

  const { getLocation, isLoading } = useCurrentLocation();

  const { mutateAsync: getCityNameByCords, isPending } = useCityNameByCords();

  const checkIfCityExists = useCheckIfCityExists();

  const { addToLocalStorage, cities, removeFromLocalStorage } =
    useCitiesLocalStorage('cities');

  const handleAddCityToLocalStorage = async () => {
    if (query.length < 2) return;

    try {
      await checkIfCityExists.mutateAsync(query);
      addToLocalStorage(query);
      setQuery('');
    } catch (error) {
      const typedError = error as ApiError;

      if (typedError.response.data.cod === '404') {
        toast.error(`City ${query} not found.`);
      } else {
        toast.error(typedError.response.data.message ?? 'Something went wrong');
      }
    }
  };

  const addCoordCityToLocalStorage = async () => {
    const { lat, lon } = await getLocation();

    const { name } = await getCityNameByCords({ lat, lon });

    if (name) addToLocalStorage(name);
  };

  return (
    <main className='flex min-h-screen justify-center px-2'>
      <div className='mt-10 w-full max-w-96'>
        <h1 className='mb-10 text-center text-3xl font-bold'>Cities</h1>
        <Search
          isLoading={isLoading || isPending}
          query={query}
          setQuery={setQuery}
          onSubmit={handleAddCityToLocalStorage}
          requestCurrentLocation={addCoordCityToLocalStorage}
        />
        <Cities
          cities={cities}
          removeCityFromLocalStorage={removeFromLocalStorage}
        />
      </div>
    </main>
  );
}
