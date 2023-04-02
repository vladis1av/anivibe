import { FC } from 'react';

import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import clsx from 'clsx';

import { EColor, ELinkPath, ERouteName } from '@enums/enums';

import { APP_LOGO, MAIN_ROUTES_MENU } from '@constants/common';

import { setOverlayVisible } from '@redux/slices/overlay';
import { setSearchByTypeState } from '@redux/slices/searchByType';
import { getThemeIsLight, setTheme } from '@redux/slices/theme';

import Link from '@ui/Link';

import MainSearch from '@components/MainSearch';

import MoonSVG from '@assets/svg/moon';
import SearchSVG from '@assets/svg/search';
import SunSVG from '@assets/svg/sun';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import entries from '@utils/entries';
import getOnlyText from '@utils/getOnlyText';
import getRouteIcon from '@utils/getRouteIcon';

import useHeaderStyles from './Header.styles';

const Header: FC = () => {
  const classes = useHeaderStyles();
  const dispatch = useAppDispatch();
  const themeIsLight = useAppSelector(getThemeIsLight);
  const { asPath } = useRouter();

  const currentRoute = getOnlyText(asPath) || ERouteName.home;
  const toggleTheme = () => dispatch(setTheme({ themeIsLight, wantUpdateLocalStorage: true }));

  const onOpenOverlay = () => {
    dispatch(setSearchByTypeState({ selectSearchTypeIsOpen: true }));
    dispatch(setOverlayVisible(true));
  };

  const onShowMobileInput = () => {
    onOpenOverlay();
    dispatch(setSearchByTypeState({ mobileInputIsVisible: true }));
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <Link path={ELinkPath.home} className={classes.headerLogo}>
          {APP_LOGO}
        </Link>

        <MainSearch onFocus={onOpenOverlay}/>

        <div className={classes.iconsWrapper}>
          {
            entries(MAIN_ROUTES_MENU).map(([key]) => (
              <Link path={ELinkPath[key]}
                className={clsx(classes.routeIconLink, { [classes.activeRoute]: key === currentRoute })}
                key={key}>{getRouteIcon(key)}</Link>
            ))
          }

          <Button
            onClick={onShowMobileInput}
            className={clsx(classes.button, classes.showSearchButton)}>
            <SearchSVG fill={EColor.white} />
          </Button>

          <Button onClick={toggleTheme} className={classes.button}>
            {themeIsLight ? <MoonSVG /> : <SunSVG />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
