import { useEffect, useState } from 'react';

const useNetworkStatus = (onOnline: () => void, onOffline: () => void) => {
  const [isOnline, setIsOnline] = useState(true);

  const onChangeOnline = () => {
    setIsOnline(true);
    onOnline();
  };

  const onChangeOffline = () => {
    setIsOnline(false);
    onOffline();
  };

  useEffect(() => {
    window.addEventListener('online', onChangeOnline);
    window.addEventListener('offline', onChangeOffline);

    return () => {
      window.removeEventListener('online', onChangeOnline);
      window.removeEventListener('offline', onChangeOffline);
    };
  }, [onOnline, onOffline]);

  return isOnline;
};

export default useNetworkStatus;
