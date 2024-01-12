'use client';
import { useState } from 'react';

import { Cities } from '@/components/cities';
import { Search } from '@/components/search';
import { useCityNameByCords } from '@/hooks/use-city-by-cords';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function Home() {
  const [query, setQuery] = useState('');

  const { getLocation, isLoading } = useCurrentLocation();

  const { mutateAsync: getCityNameByCords, isPending } = useCityNameByCords();

  const { addToLocalStorage, cities, removeFromLocalStorage } =
    useLocalStorage('cities');

  const handleAddCityToLocalStorage = () => {
    if (query.length < 2) return;

    addToLocalStorage(query);
    setQuery('');
  };

  const addCoordCityToLocalStorage = async () => {
    const { lat, lon } = await getLocation();

    if (!lat || !lon) return;

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
