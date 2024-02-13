import {
  FC,
  useRef,
  useState,
  ReactNode,
  useEffect,
  createContext,
} from 'react';

import { getNotifications } from '@redux/slices/notifications';

import useAppSelector from '@hooks/useAppSelector';

import Header from './Header';

type HeaderContextProviderProps = {
  children: ReactNode;
};

const DEFAULT_HEADER_HEIGHT: number = 60;

export const HeaderContext = createContext<number>(DEFAULT_HEADER_HEIGHT);

const HeaderContextProvider: FC<HeaderContextProviderProps> = ({ children }) => {
  const { app } = useAppSelector(getNotifications);
  const [headerHeight, setHeaderHeight] = useState<number>(DEFAULT_HEADER_HEIGHT);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef && headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current, app.length]);

  return <HeaderContext.Provider value={headerHeight}>
    <Header headerRef={headerRef} />

    {children}
  </HeaderContext.Provider>;
};

export default HeaderContextProvider;
