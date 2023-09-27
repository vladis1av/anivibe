import { useEffect } from 'react';

const useInterval = (callback: () => void, delay: number | null) => {
  let intervalId: ReturnType<typeof setInterval>;

  useEffect(() => {
    function tick() {
      callback();
    }

    if (delay !== null) {
      intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [delay]);
};

export default useInterval;
