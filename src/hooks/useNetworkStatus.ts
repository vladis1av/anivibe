import { useEffect, useState } from 'react';

import { IS_SERVER } from '@constants/common';

const useNetworkStatus = (onOnline: () => void, onOffline: () => void) => {
  const [isOnline, setIsOnline] = useState(!IS_SERVER && window.navigator.onLine);

  const onChangeOnline = () => {
    setIsOnline(true);
    onOnline();
  };

  const onChangeOffline = () => {
    setIsOnline(false);
    onOffline();
  };

  useEffect(() => {
    if (!IS_SERVER) {
      window.addEventListener('online', onChangeOnline);
      window.addEventListener('offline', onChangeOffline);
    }

    return () => {
      if (!IS_SERVER) {
        window.removeEventListener('online', onChangeOnline);
        window.removeEventListener('offline', onChangeOffline);
      }
    };
  }, [onOnline, onOffline]);

  return isOnline;
};

export default useNetworkStatus;
