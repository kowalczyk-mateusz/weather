import { useEffect, useState } from 'react';

const DEFAULT_CITIES = ['Katowice', 'Gliwice', 'Gdańsk', 'Warszawa', 'Kraków'];

export const useLocalStorage = (key: string) => {
  const [cities, setCities] = useState<string[]>([]);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  useEffect(() => {
    const currentLocalStorage = localStorage.getItem(key);
    const parsedLocalStorage = currentLocalStorage
      ? JSON.parse(currentLocalStorage)
      : [];

    if (parsedLocalStorage.length <= 0) {
      localStorage.setItem(key, JSON.stringify(DEFAULT_CITIES));
      setCities(DEFAULT_CITIES);
    } else {
      setCities(parsedLocalStorage);
    }
  }, [key]);

  const updateLocalStorage = (updatedCities: string[]) => {
    localStorage.setItem(key, JSON.stringify(updatedCities));
    setCities(updatedCities);
  };

  const addToLocalStorage = (value: string) => {
    const currentLocalStorage = localStorage.getItem(key);

    if (currentLocalStorage) {
      const parsedLocalStorage = JSON.parse(currentLocalStorage);
      if (!parsedLocalStorage.includes(value)) {
        parsedLocalStorage.push(value);
        updateLocalStorage(parsedLocalStorage);
      }
    } else {
      updateLocalStorage([value]);
    }
  };

  const removeFromLocalStorage = (value: string) => {
    const currentLocalStorage = localStorage.getItem(key);

    if (currentLocalStorage) {
      const parsedLocalStorage = JSON.parse(currentLocalStorage);
      const index = parsedLocalStorage.indexOf(value);

      if (index !== -1) {
        parsedLocalStorage.splice(index, 1);
        updateLocalStorage(parsedLocalStorage);
      }
    }
  };

  return { cities, addToLocalStorage, removeFromLocalStorage };
};
