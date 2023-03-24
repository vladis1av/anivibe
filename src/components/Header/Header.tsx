import {
  FC, useRef,
} from 'react';

import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import clsx from 'clsx';

import { ECollectionType } from '@interfaces/collection';

import {
  ECollection, EColor, ELinkPath, ELoadingStatus, ERouteName,
} from '@enums/enums';

import {
  APP_LOGO, MAIN_ROUTES_MENU, SEARCH_ANIME_PLACEHOLDER, SEARCH_MANGA_PLACEHOLDER, SELECT_SEARCH_TYPES,
} from '@constants/common';

import { getOverlay, setOverlayVisible } from '@redux/slices/overlay';
import {
  fetchTitles,
  setSearchByTypeState,
  setSearchByTypeDefaultState,
  getSearchByTypeState,
} from '@redux/slices/searchByType';
import { getThemeIsLight, setTheme } from '@redux/slices/theme';

import InputWithSelect from '@ui/InputWithSelect';
import Link from '@ui/Link';
import LoadingStatus from '@ui/LoadingStatus';
import SearchCard from '@ui/SearchCard';

import MoonSVG from '@assets/svg/moon';
import SearchSVG from '@assets/svg/search';
import SunSVG from '@assets/svg/sun';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useDebounce from '@hooks/useDebounce';
import useOnClickOutside from '@hooks/useOnClickOutside';

import entries from '@utils/entries';
import getOnlyText from '@utils/getOnlyText';
import getRouteIcon from '@utils/getRouteIcon';
import getSearchProps, { SearchPropsData } from '@utils/getSearchProps';

import useHeaderStyles from './Header.styles';

const Header: FC = () => {
  const classes = useHeaderStyles();
  const dispatch = useAppDispatch();
  const themeIsLight = useAppSelector(getThemeIsLight);
  const overlayIsVisible = useAppSelector(getOverlay);

  const inputRef = useRef<HTMLInputElement>(null);
  const { asPath } = useRouter();
  const {
    searchValue,
    loadingState,
    searchType,
    foundTitles,
    mobileInputIsVisible,
    selectSearchTypeIsOpen,
  } = useAppSelector(getSearchByTypeState);
  const currentRoute = getOnlyText(asPath) || ERouteName.home;
  const inputPlaceholderTitle = searchType === ECollection.anime ? SEARCH_ANIME_PLACEHOLDER : SEARCH_MANGA_PLACEHOLDER;
  const toggleTheme = () => dispatch(setTheme({ themeIsLight, wantUpdateLocalStorage: true }));

  const onChangeInput = (currentValue: string) => {
    dispatch(setSearchByTypeState({ searchValue: currentValue }));
  };

  const onOpenOverlay = () => {
    dispatch(setSearchByTypeState({ selectSearchTypeIsOpen: true }));
    dispatch(setOverlayVisible(true));
  };

  const onCloseOverlay = () => {
    if (overlayIsVisible) {
      dispatch(setSearchByTypeDefaultState());
      dispatch(setOverlayVisible(false));
    }
  };

  const fetchItems = () => {
    if (searchValue.trim().length) {
      dispatch(fetchTitles({ type: searchType, searchValue }));
    } else {
      dispatch(setSearchByTypeState({ loadingState: ELoadingStatus.idle, foundTitles: [] }));
    }
  };

  const showMobileInput = () => {
    onOpenOverlay();
    dispatch(setSearchByTypeState({ mobileInputIsVisible: true }));
  };

  const onChangeSelectedType = (select: string) => {
    dispatch(setSearchByTypeState({ searchType: select as ECollectionType }));
  };

  useOnClickOutside(inputRef, () => onCloseOverlay());
  useDebounce(300, searchValue, fetchItems);

  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <Link path={ELinkPath.home} className={classes.headerLogo}>
          {APP_LOGO}
        </Link>

        <div className={clsx(classes.inputWrapper, { [classes.showInput]: mobileInputIsVisible })} ref={inputRef}>
          <InputWithSelect
            value={searchValue}
            selects={SELECT_SEARCH_TYPES}
            onFocus={onOpenOverlay}
            onChange={onChangeInput}
            onSelect={onChangeSelectedType}
            onClose={onCloseOverlay}
            isFocused={loadingState === ELoadingStatus.idle && selectSearchTypeIsOpen}
            placeholder={inputPlaceholderTitle}
            currentSearchSelectType={searchType}
          />

          <LoadingStatus
            isPending={loadingState === ELoadingStatus.pending }
            isError={loadingState === ELoadingStatus.error}
            className={classes.searchListLoadInfo}
          />

          {
            foundTitles.length > 0
                && <div className={classes.searchList}>
                  {foundTitles.map((data) => {
                    const searchProps = getSearchProps([searchType, data] as SearchPropsData);

                    return searchProps ? <SearchCard
                      {...searchProps}
                      key={data.id}
                      onClick={onCloseOverlay}
                    /> : searchProps;
                  })}
                </div>
          }
        </div>

        <div className={classes.iconsWrapper}>
          {
            entries(MAIN_ROUTES_MENU).map(([key]) => (
              <Link path={ELinkPath[key]}
                className={clsx(classes.routeIconLink, { [classes.activeRoute]: key === currentRoute })}
                key={key}>{getRouteIcon(key)}</Link>
            ))
          }

          <Button
            onClick={showMobileInput}
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
