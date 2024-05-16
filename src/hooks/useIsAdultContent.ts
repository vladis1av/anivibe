import { useEffect } from 'react';

import { setIsAdultContent } from '@redux/slices/app';

import useAppDispatch from './useAppDispatch';

const useIsAdultContent = (value: string, title: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const isAdultContentFromLocal = window.localStorage.getItem('isAdultContent');

    if (isAdultContentFromLocal === null && value && title) {
      const isAdult = (value === '18_plus' || value === 'lgbt');
      dispatch(setIsAdultContent({ isAdultContent: isAdult, adultTitleName: isAdult ? title : '' }));
    }
  }, [value, title]);
};

export default useIsAdultContent;
