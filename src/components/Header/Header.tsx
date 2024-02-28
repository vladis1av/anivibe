import { FC, ForwardedRef } from 'react';

import dynamic from 'next/dynamic';

import Button from '@mui/material/Button';
import clsx from 'clsx';

import {
  EColor,
  ELinkPath,
  ENotification,
  ENotificationKey,
} from '@enums/enums';

import {
  APP_LOGO,
  COOKIE_MESSAGE_NOTIFICATION,
  STORAGE_MESSAGE_NOTIFICATION,
} from '@constants/common';
import { APP_NAME } from '@constants/seo';

import { setNotification } from '@redux/slices/notifications';
import { setOverlayVisible } from '@redux/slices/overlay';
import { getSearchByTypeState, setSearchByTypeState } from '@redux/slices/searchByType';
import { getThemeIsLight, toggleTheme } from '@redux/slices/theme';

import Link from '@ui/Link';
import SkeletonBlock from '@ui/Skeletons/Block/Block';

import Navigation from '@components/Navigation';

import MoonSVG from '@assets/svg/moon';
import SearchSVG from '@assets/svg/search';
import SunSVG from '@assets/svg/sun';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import localStorageIsAvailable from '@utils/window/localStorageIsAvailable';

import useHeaderStyles from './Header.styles';

const TopHeaderNotification = dynamic(() => import('@components/TopHeaderNotification'), { ssr: false });
const MainSearch = dynamic(
  () => import('@components/MainSearch'),
  { ssr: false, loading: () => (<SkeletonBlock width={400} height={32} />) },
);

type HeaderProps = {
  headerRef: ForwardedRef<HTMLElement>
};

const Header: FC<HeaderProps> = ({ headerRef }) => {
  const classes = useHeaderStyles();
  const dispatch = useAppDispatch();
  const themeIsLight = useAppSelector(getThemeIsLight);
  const { mobileInputIsVisible } = useAppSelector(getSearchByTypeState);

  const toggleCurrentTheme = () => {
    const cookieIsAvailable = window.navigator.cookieEnabled;
    const { storageIsAvailable } = localStorageIsAvailable();

    if (cookieIsAvailable) {
      dispatch(toggleTheme({ themeIsLight, updateCookie: true }));
      return;
    }

    if (!cookieIsAvailable) {
      dispatch(setNotification({
        notificationKey: ENotificationKey.app,
        notification: { message: COOKIE_MESSAGE_NOTIFICATION, type: ENotification.cookie },
      }));
    }

    if (!storageIsAvailable) {
      dispatch(setNotification({
        notificationKey: ENotificationKey.app,
        notification: { message: STORAGE_MESSAGE_NOTIFICATION, type: ENotification.storage },
      }));
    }

    dispatch(toggleTheme({ themeIsLight, updateLocalStorage: !cookieIsAvailable && storageIsAvailable }));
  };

  const onOpenOverlay = () => {
    dispatch(setSearchByTypeState({ selectSearchTypeIsOpen: true }));
    dispatch(setOverlayVisible(true));
  };

  const onShowMobileInput = () => {
    onOpenOverlay();
    dispatch(setSearchByTypeState({ mobileInputIsVisible: true }));
  };

  return (
    <header className={classes.header} ref={headerRef}>
      <TopHeaderNotification />

      <div className={classes.headerContainer}>
        <Link path={ELinkPath.home} className={classes.headerLogo} attributeTitle={APP_NAME}>
          {APP_LOGO}
        </Link>

        <div className={clsx(classes.searchWrapper, { [classes.showInput]: mobileInputIsVisible })}>
          <MainSearch
            onFocus={onOpenOverlay}
            className={clsx({ [classes.searchInput]: mobileInputIsVisible })}
          />
        </div>

        <div className={classes.navWrapper}>
          <Navigation />

          <Button
            onClick={onShowMobileInput}
            className={clsx(classes.button, classes.showSearchButton)}>
            <SearchSVG fill={EColor.white} />
          </Button>

          <Button onClick={toggleCurrentTheme} className={classes.button}>
            {themeIsLight ? <MoonSVG /> : <SunSVG />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
