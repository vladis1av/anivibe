import { FC } from 'react';

import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import clsx from 'clsx';

import { EColor, ELinkPath, ERouteName } from '@enums/enums';

import { APP_LOGO, MAIN_ROUTES_MENU } from '@constants/common';
import { APP_NAME_UPPER_CASE } from '@constants/seo';

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

import useCommonStyles from '@styles/Common.styles';

import useHeaderStyles from './Header.styles';

const Header: FC = () => {
  const classes = useHeaderStyles();
  const dispatch = useAppDispatch();
  const commonClasses = useCommonStyles();
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
        <Link path={ELinkPath.home} className={classes.headerLogo} attributeTitle={APP_NAME_UPPER_CASE}>
          {APP_LOGO}
        </Link>

        <MainSearch onFocus={onOpenOverlay}/>

        <nav className={classes.iconsWrapper}>
          {
            entries(MAIN_ROUTES_MENU).map(([key, value]) => {
              const { title } = value;
              return (
                <Link
                  path={ELinkPath[key]}
                  key={key}
                  attributeTitle={title}
                  className={clsx(classes.routeIconLink, { [classes.activeRoute]: key === currentRoute })}
                >
                  <span className={commonClasses.displayHide}>{title}</span>
                  {getRouteIcon(key)}
                </Link>
              );
            })
          }

          <Button
            onClick={onShowMobileInput}
            className={clsx(classes.button, classes.showSearchButton)}>
            <SearchSVG fill={EColor.white} />
          </Button>

          <Button onClick={toggleTheme} className={classes.button}>
            {themeIsLight ? <MoonSVG /> : <SunSVG />}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
