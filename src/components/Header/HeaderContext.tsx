import {
  FC, ReactNode, RefObject, createContext, useEffect, useState,
} from 'react';

import { getNotifications } from '@redux/slices/notifications';

import useAppSelector from '@hooks/useAppSelector';

type HeaderContextType = number;

type HeaderContextProviderProps = {
  headerRef: RefObject<HTMLElement>;
  children: ReactNode;
};

const DEFAULT_HEADER_HEIGHT: number = 60;

export const HeaderContext = createContext<HeaderContextType>(DEFAULT_HEADER_HEIGHT);

const HeaderContextProvider: FC<HeaderContextProviderProps> = ({ headerRef, children }) => {
  const { app } = useAppSelector(getNotifications);
  const [headerHeight, setHeaderHeight] = useState<number>(DEFAULT_HEADER_HEIGHT);

  useEffect(() => {
    if (headerRef && headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current, app]);

  return <HeaderContext.Provider value={headerHeight}>
    {children}
  </HeaderContext.Provider>;
};

export default HeaderContextProvider;
