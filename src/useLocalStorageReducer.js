import { useEffect, useReducer } from 'react';

// useReducer whose state is persisted in localStorage
export function useLocalStorageReducer(key, reducer, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialValue, (init) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* storage full or unavailable: keep working in memory */
    }
  }, [key, state]);

  return [state, dispatch];
}
