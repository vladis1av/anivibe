import { useState } from 'react';

const useIsLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return { isLoading, setIsLoading };
};

export default useIsLoading;
