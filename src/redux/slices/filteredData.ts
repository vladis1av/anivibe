import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Anime } from '@interfaces/anime';
import { ECollectionType } from '@interfaces/collection';
import { ELoadingStatusType } from '@interfaces/common';
import { MangaBase } from '@interfaces/manga';
import { Params } from '@interfaces/services';

import { ECollection, ELoadingStatus } from '@enums/enums';

import { DEFAULT_YEAR_FOR_QUERY } from '@constants/common';

import { FETCH_FILTERED_DATA } from '@redux/actionType/filteredData.actionType';
import { AppState } from '@redux/store';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

import checkObjectValueAndExcludeKey from '@utils/checkObjectValueAndExcludeKey';
import getAppHydrate from '@utils/getAppHydrate';

export type FilteredData = Pick<Anime, 'id' | 'code' | 'names'>[] | MangaBase[] | [];

export type FilteredDataSliceState = {
  filteredData: FilteredData;
  loadingState: ELoadingStatusType;
};

type FetchFilteredData = {
  filteredDataType: ECollectionType;
  params: Params;
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
      if (typeIsAnime) {
        const currentParams = checkObjectValueAndExcludeKey(params, ['after', 'limit'])
          ? params
          : { ...params, year: DEFAULT_YEAR_FOR_QUERY };
        const animesResult = await getFilteredData({
          method: 'searchTitles',
          filters: [
            'id',
            'code',
            'names',
          ],
          params: currentParams,
        });
        result = animesResult || [];
      } else {
        const mangasResult = await getMangas({ order: 'popular', ...params });
        result = mangasResult?.response || [];
      }

      if (!result.length) {
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
