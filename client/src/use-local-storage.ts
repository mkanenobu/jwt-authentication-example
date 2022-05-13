import { useState, useCallback } from "react";

export const useLocalStorage = (
  key: string,
  initialValue: string
): [value: string, setItem: (value: string) => void] => {
  const getItem = (_key: string) => {
    try {
      const item = window.localStorage.getItem(_key);
      return item ?? initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(() => getItem(key));

  const setItem = useCallback((value: string) => {
    try {
      window.localStorage.setItem(key, value);
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return [storedValue, setItem];
};
