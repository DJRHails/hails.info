import { useState } from "react";
import { isBrowser } from "./browser";

function useLocalStorage<V>(key: string, initialValue: V) {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = isBrowser() ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  // that persists the new value to localStorage.
  const setValue = (value: (previous: V) => void | V) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // TODO(DJRHails): Think about handling this
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
