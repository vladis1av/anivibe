import { useEffect } from 'react';

function useDebounce(delay: number, value: string, callback: () => void) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);
}

export default useDebounce;
