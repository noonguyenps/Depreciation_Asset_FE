import { useState, useEffect } from "react";

const useDebounce = (initializeValue = "", delay) => {
  const [debouncedValue, setDebouncedValue] = useState(initializeValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(initializeValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [initializeValue, delay]);

  return debouncedValue;
};

export default useDebounce;
