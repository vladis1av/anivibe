import { useState, useLayoutEffect } from 'react';

import { IS_SERVER } from '@constants/common';

const useMatchMedia = (queries: string[]) => {
  if (!queries?.length || IS_SERVER) return [];

  const [mediaMatches, setMediaMatches] = useState<boolean[]>([]);

  useLayoutEffect(() => {
    const mediaQueryLists = queries.map((query) => matchMedia(query));
    const getMatches = () => mediaQueryLists.map((list) => list.matches);
    const onChangeMediaQuery = () => setMediaMatches(getMatches);
    // setValues
    onChangeMediaQuery();

    mediaQueryLists.forEach((list) => list.addEventListener('change', onChangeMediaQuery));

    return () => mediaQueryLists.forEach((list) => list.removeEventListener('change', onChangeMediaQuery));
  }, []);

  return mediaMatches;
};

export default useMatchMedia;
