import { useEffect } from 'react';

const useBlockScroll = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'auto';
  }, [condition]);
};

export default useBlockScroll;
