import { useEffect, useState } from "react";

export default function useLocalStorage(key,INITIAL_STATE) {
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem(key)) || INITIAL_STATE
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);
  return [value, setValue];
}
