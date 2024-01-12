import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { DEFAULT_CITIES } from '@/utils/constants';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/local-storage';

export const useCitiesLocalStorage = (key: string) => {
  const [cities, setCities] = useState<string[]>([]);

  const updateLocalStorage = useCallback(
    (updatedCities: string[]) => {
      setLocalStorageItem(key, JSON.stringify(updatedCities));
      setCities(updatedCities);
    },
    [key]
  );

  const addToLocalStorage = (value: string) => {
    const localStorageCities = getLocalStorageItem(key);

    if (
      localStorageCities
        .map((city) => city.toLowerCase())
        .includes(value.toLowerCase())
    ) {
      toast.error(`${value} is already on the list!`);
    } else {
      updateLocalStorage([...localStorageCities, value]);
      toast.success(`City ${value} added to the list!`);
    }
  };

  const removeFromLocalStorage = (value: string) => {
    const localStorageCities = getLocalStorageItem(key);
    if (localStorageCities.includes(value)) {
      updateLocalStorage(localStorageCities.filter((city) => city !== value));
    }
  };

  useEffect(() => {
    const localStorageCities = getLocalStorageItem(key);

    if (localStorageCities.length <= 0) {
      updateLocalStorage(DEFAULT_CITIES);
    } else {
      setCities(localStorageCities);
    }
  }, [key, updateLocalStorage]);

  return { cities, addToLocalStorage, removeFromLocalStorage };
};
