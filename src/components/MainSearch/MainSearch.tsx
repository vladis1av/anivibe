import { FC, useRef } from 'react';

import clsx from 'clsx';

import { ECollectionType } from '@interfaces/collection';

import { ELoadingStatus } from '@enums/enums';

import {
  MAIN_SEARCH_INPUT_PLACEHOLDER, SELECT_SEARCH_TYPES,
} from '@constants/common';

import { getOverlay, setOverlayVisible } from '@redux/slices/overlay';
import {
  fetchTitles,
  getSearchByTypeState,
  setSearchByTypeState,
  setSearchByTypeDefaultState,
} from '@redux/slices/searchByType';

import InputWithSelect from '@ui/InputWithSelect';
import LoadingStatus from '@ui/LoadingStatus';
import SearchCard from '@ui/SearchCard';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';
import useDebounce from '@hooks/useDebounce';
import useOnClickOutside from '@hooks/useOnClickOutside';

import getSearchProps from '@utils/getSearchProps';

import useMainSearchStyles from './MainSearch.styles';

type MainSearchProps = {
  onFocus: () => void;
  className?: string;
};

const MainSearch: FC<MainSearchProps> = ({ onFocus, className }) => {
  const classes = useMainSearchStyles();
  const dispatch = useAppDispatch();
  const {
    searchValue,
    loadingState,
    searchType,
    foundTitles,
    selectSearchTypeIsOpen,
  } = useAppSelector(getSearchByTypeState);
  const overlayIsVisible = useAppSelector(getOverlay);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputPlaceholder = selectSearchTypeIsOpen
    ? `Поиск ${MAIN_SEARCH_INPUT_PLACEHOLDER[searchType]}...`
    : 'Поиск...';

  const onChangeInput = (currentValue: string) => {
    dispatch(setSearchByTypeState({ searchValue: currentValue }));
  };

  const onChangeSelectedType = (select: string) => {
    dispatch(setSearchByTypeState({ searchType: select as ECollectionType }));
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

  useOnClickOutside(inputRef, () => onCloseOverlay());
  useDebounce(300, searchValue, fetchItems);

  return (
    <div className={clsx(classes.inputWrapper, className)} ref={inputRef}>
      <InputWithSelect
        value={searchValue}
        selects={SELECT_SEARCH_TYPES}
        onFocus={onFocus}
        onChange={onChangeInput}
        onSelect={onChangeSelectedType}
        onClose={onCloseOverlay}
        isFocused={loadingState === ELoadingStatus.idle && selectSearchTypeIsOpen}
        placeholder={inputPlaceholder}
        currentSearchSelectType={searchType || ''}
      />

      <LoadingStatus
        isPending={loadingState === ELoadingStatus.pending }
        isError={loadingState === ELoadingStatus.error}
        className={classes.searchListLoadInfo}
      />

      {
        foundTitles.length > 0
           && <div className={classes.searchList}>
             {
               foundTitles.map((data) => (
                 <SearchCard {...getSearchProps(data)} key={data.id} onClick={onCloseOverlay} />
               ))
             }
           </div>
      }
    </div>
  );
};

export default MainSearch;
