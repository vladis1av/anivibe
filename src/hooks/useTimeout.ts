import { useEffect } from 'react';

const useTimeout = (onTimeout: () => void, timeMs: number | null | undefined) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (timeMs) {
      timer = setTimeout(() => {
        onTimeout();
      }, timeMs);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeMs, onTimeout]);
};

export default useTimeout;
