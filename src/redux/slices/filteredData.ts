import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Anime } from '@interfaces/anime/anime';
import { AnimeServiceParams } from '@interfaces/anime/service';
import { ECollectionType } from '@interfaces/collection';
import { ELoadingStatusType } from '@interfaces/common';
import { MangaBase } from '@interfaces/manga/manga';
import { MangaServiceParams } from '@interfaces/manga/service';

import isAnimeServiceParamsTypeGuard from '@typeGuards/isAnimeServiceParams';

import {
  EAnimeMethod, ECollection, ELoadingStatus, EMangaOrderBy,
} from '@enums/enums';

import { DEFAULT_CURRENT_YEAR } from '@constants/common';

import { FETCH_FILTERED_DATA } from '@redux/actionType/filteredData.actionType';
import { AppState } from '@redux/store';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

import checkObjectValueAndExcludeKey from '@utils/object/checkObjectValueAndExcludeKey';
import getAppHydrate from '@utils/store/getAppHydrate';

export type FilteredData = Pick<Anime, 'id' | 'code' | 'names'>[] | MangaBase[] | [];

export type FilteredDataSliceState = {
  filteredData: FilteredData;
  loadingState: ELoadingStatusType;
};

type FetchFilteredData = {
  filteredDataType: ECollectionType;
  params: AnimeServiceParams | MangaServiceParams;
  loadMore?: boolean;
};

const initialState: FilteredDataSliceState = {
  filteredData: [],
  loadingState: ELoadingStatus.idle,
};

const HYDRATE = getAppHydrate();

export const filteredDataSlice = createSlice({
  name: 'filteredData',
  initialState,
  reducers: {
    setFilteredData: (
      state,
      { payload }: PayloadAction<{ data: FilteredData, loadMore?: boolean }>,
    ) => {
      const { data, loadMore = false } = payload;

      if (loadMore) {
        state.filteredData = [...state.filteredData, ...data] as FilteredData;
        return;
      }

      state.filteredData = data;
    },
    setLoadingState: (
      state,
      action: PayloadAction<ELoadingStatusType>,
    ) => {
      state.loadingState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.filteredData,
      }));
  },
});

export const getFilterDataState = ({ filteredData }: AppState) => filteredData;

export const filterDataReducer = filteredDataSlice.reducer;
export const { setFilteredData, setLoadingState } = filteredDataSlice.actions;

export const fetchFilteredData = createAsyncThunk<unknown, FetchFilteredData>(
  FETCH_FILTERED_DATA,
  async ({
    filteredDataType, params, loadMore = false,
  }, { dispatch }) => {
    dispatch(setLoadingState(ELoadingStatus.pending));
    try {
      let result: FilteredData = [];
      const typeIsAnime = filteredDataType === ECollection.anime;

      if (isAnimeServiceParamsTypeGuard(params)) {
        const currentParams = checkObjectValueAndExcludeKey(params, ['after', 'items_per_page'])
          ? params
          : { ...params, year: DEFAULT_CURRENT_YEAR };
        const animes = await getFilteredData({
          method: EAnimeMethod.searchTitles,
          filters: [
            'id',
            'code',
            'names',
          ],
          params: currentParams,
        });
        result = animes?.list || [];
      } else {
        const mangasResult = await getMangas({ order: EMangaOrderBy.popular, ...params });
        result = mangasResult?.response || [];
      }

      if (!result.length) {
        if (!loadMore) {
          dispatch(setFilteredData({ data: [] }));
        }
        throw new Error('Titles Not found : 404');
      }

      if (typeIsAnime && loadMore) {
        dispatch(setFilteredData({ data: result, loadMore }));
        dispatch(setLoadingState(ELoadingStatus.success));
        return;
      }

      dispatch(setFilteredData({ data: result }));
      dispatch(setLoadingState(ELoadingStatus.success));
    } catch (error) {
      dispatch(setLoadingState(ELoadingStatus.error));
    }
  },
);
