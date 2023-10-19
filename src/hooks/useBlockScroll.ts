import { useEffect } from 'react';

const useBlockScroll = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'auto';
  }, [condition]);
};

export default useBlockScroll;
