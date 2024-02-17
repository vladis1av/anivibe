import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { SearchAnimeType } from '@interfaces/anime/service';
import { ECollectionType } from '@interfaces/collection';
import { ELoadingStatusType } from '@interfaces/common';
import { MangaBase } from '@interfaces/manga/manga';

import {
  ECollection,
  EAnimeMethod,
  ELoadingStatus,
  EMangaReleaseKind,
} from '@enums/enums';

import { SEARCH_BY_TYPE_FETCH_TITLES } from '@redux/actionType/searchByType.actionType';
import { AppState } from '@redux/store';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

export type FoundTitles = SearchAnimeType[] | MangaBase[] | [];

type FetchTitlesType = {
  type: ECollectionType | null;
  searchValue: string;
};

export type SearchByTypeState = {
  searchValue: string;
  loadingState: ELoadingStatusType;
  searchType: ECollectionType | null;
  foundTitles: FoundTitles;
  mobileInputIsVisible: boolean;
  selectSearchTypeIsOpen: boolean;
};

export const fetchTitles = createAsyncThunk<FoundTitles, FetchTitlesType>(
  SEARCH_BY_TYPE_FETCH_TITLES,
  async ({ type, searchValue }) => {
    let result: FoundTitles = [];

    if (type === ECollection.anime) {
      const animes = await getFilteredData({
        method: EAnimeMethod.searchTitles,
        filters: [
          'id',
          'code',
          'genres',
          'names',
          'type',
          'season',
        ],
        params: { search: searchValue },
      });
      result = animes ? animes.list : [];
    } else {
      const kinds = type !== ECollection.manga && type !== ECollection.manhwa
        ? [
          EMangaReleaseKind.manhua,
          EMangaReleaseKind.comics,
          EMangaReleaseKind.one_shot,
        ]
        : [type];
      const mangasResult = await getMangas({ limit: 50, search: searchValue, kinds }, true);
      result = mangasResult?.response || [];
    }

    return result;
  },
);

const initialState: SearchByTypeState = {
  searchValue: '',
  loadingState: ELoadingStatus.idle,
  searchType: null,
  foundTitles: [],
  mobileInputIsVisible: false,
  selectSearchTypeIsOpen: false,
};

export const searchByTypeSlice = createSlice({
  name: 'searchByType',
  initialState,
  reducers: {
    setSearchByTypeState: (state, { payload }: PayloadAction<Partial<SearchByTypeState>>) => ({ ...state, ...payload }),
    setSearchByTypeDefaultState: (state) => ({ ...state, ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTitles.pending, (state) => {
        state.foundTitles = [];
        state.loadingState = ELoadingStatus.pending;
      })
      .addCase(fetchTitles.fulfilled, (state, { payload }) => {
        const currentLoadingState = !payload.length ? ELoadingStatus.error : ELoadingStatus.success;
        state.foundTitles = payload;
        state.loadingState = currentLoadingState;
      })
      .addCase(fetchTitles.rejected, (state) => {
        state.foundTitles = [];
        state.loadingState = ELoadingStatus.error;
      });
  },
});

export const {
  setSearchByTypeState,
  setSearchByTypeDefaultState,
} = searchByTypeSlice.actions;

export const getSearchByTypeState = ({ searchByType }: AppState) => searchByType;

export const searchByTypeReducer = searchByTypeSlice.reducer;
