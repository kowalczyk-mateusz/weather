export const getLocalStorageItem = (key: string): string[] => {
  const currentLocalStorage = localStorage.getItem(key);

  return currentLocalStorage ? JSON.parse(currentLocalStorage) : [];
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
