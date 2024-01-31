import Button from '@mui/material/Button';
import clsx from 'clsx';

import { EColor, ELinkPath } from '@enums/enums';

import { APP_LOGO } from '@constants/common';
import { APP_NAME_UPPER_CASE } from '@constants/seo';

import { setOverlayVisible } from '@redux/slices/overlay';
import { setSearchByTypeState } from '@redux/slices/searchByType';
import { getThemeIsLight, setTheme } from '@redux/slices/theme';

import Link from '@ui/Link';

import MainSearch from '@components/MainSearch';
import Navigation from '@components/Navigation';
import TopHeaderNotification from '@components/TopHeaderNotification';

import MoonSVG from '@assets/svg/moon';
import SearchSVG from '@assets/svg/search';
import SunSVG from '@assets/svg/sun';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import useHeaderStyles from './Header.styles';

const Header = () => {
  const classes = useHeaderStyles();
  const dispatch = useAppDispatch();
  const themeIsLight = useAppSelector(getThemeIsLight);

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
      <TopHeaderNotification />

      <div className={classes.headerContainer}>
        <Link path={ELinkPath.home} className={classes.headerLogo} attributeTitle={APP_NAME_UPPER_CASE}>
          {APP_LOGO}
        </Link>

        <MainSearch onFocus={onOpenOverlay}/>

        <div className={classes.navWrapper}>
          <Navigation />

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
