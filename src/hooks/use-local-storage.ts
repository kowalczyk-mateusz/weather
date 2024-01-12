import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { DEFAULT_CITIES } from '@/utils/constants';

const getLocalStorage = (key: string): string[] => {
  const currentLocalStorage = localStorage.getItem(key);
  const parsedLocalStorage = currentLocalStorage
    ? JSON.parse(currentLocalStorage)
    : [];

  return parsedLocalStorage;
};

export const useLocalStorage = (key: string) => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const localStorageCities = getLocalStorage(key);

    if (localStorageCities.length <= 0) {
      localStorage.setItem(key, JSON.stringify(DEFAULT_CITIES));
      setCities(DEFAULT_CITIES);
    } else {
      setCities(localStorageCities);
    }
  }, [key]);

  const updateLocalStorage = (updatedCities: string[]) => {
    localStorage.setItem(key, JSON.stringify(updatedCities));
    setCities(updatedCities);
  };

  const addToLocalStorage = (value: string) => {
    const localStorageCities = getLocalStorage(key);

    if (
      localStorageCities
        .map((city) => city.toLowerCase())
        .includes(value.toLowerCase())
    ) {
      toast.error(`${value} is already on the list!`);
      return;
    } else {
      updateLocalStorage([...localStorageCities, value]);
    }
  };

  const removeFromLocalStorage = (value: string) => {
    const localStorageCities = getLocalStorage(key);
    if (localStorageCities.includes(value)) {
      updateLocalStorage(localStorageCities.filter((city) => city !== value));
    }
  };

  return { cities, addToLocalStorage, removeFromLocalStorage };
};
