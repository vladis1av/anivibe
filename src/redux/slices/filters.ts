import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ECollectionType } from '@interfaces/collection';
import {
  EFilterLoadingType,
  EMangaReleaseKindType,
  FilterKindType,
  Values,
} from '@interfaces/common';

import { ECollection, EFilterLoading, ELoadingStatus } from '@enums/enums';

import {
  FILTER_ORDERS_BY, FILTER_SEASONS, FILTER_GENRES, MANGA_FILTER_KINDS,
} from '@constants/filters';

import { FETCH_FILTER_YEARS } from '@redux/actionType/filters.actionType';
import { AppState } from '@redux/store';

import { getYears } from '@services/api/anime';

import filter from '@utils/array/filter';
import getAppHydrate from '@utils/store/getAppHydrate';

export type MangaFilterKinds = Array<EMangaReleaseKindType>;

export type AnimeFilterQuery = {
  years?: string;
  voices?: string;
  genres?: string;
  seasons?: string;
};

export type MangaFilterQuery = {
  genres?: string;
  order?: string;
  kinds?: string;
};

export type AnimeFilters = {
  years: number[] | [];
  voices: number[] | [];
  genres: FilterKindType[];
  seasons: FilterKindType[];
};

export type MangaFilters = {
  genres: FilterKindType[];
  order: FilterKindType[] | [];
  kinds: FilterKindType[];
};

type FilterValues = {
  years: string[] | [];
  voices: string[] | [];
  kinds: MangaFilterKinds | [];
  genres: FilterKindType[] | [];
  seasons: FilterKindType[] | [];
  order: FilterKindType[] | [];
};

type AnimeFilterKeys = keyof AnimeFilters;
type MangaFilterKeys = keyof MangaFilters;

export type FiltersKeyses = AnimeFilterKeys | MangaFilterKeys;

export type FilterTypeWithKey = [ECollection.manga, MangaFilterKeys] | [ECollection.anime, AnimeFilterKeys];
export type FilterQueryWithType = [ECollection.manga, MangaFilterQuery] | [ECollection.anime, AnimeFilterQuery];

type FiltersLoading = {
  [key in FiltersKeyses]?: EFilterLoadingType;
};

export type FiltersState = {
  filterType: ECollectionType;
  filtersLoading: FiltersLoading;
  animeFilters: AnimeFilters;
  mangaFilters: MangaFilters;
  filtersQueryValues: FilterValues;
};

const intersect = (
  filterItems: Values<AnimeFilters> | Values<MangaFilters>,
  queryKeys: string[],
): (FilterKindType)[] | number[] | MangaFilterKinds | [] => {
  if (filterItems && filterItems.length && queryKeys.length) {
    const strArr = new Set(queryKeys);

    const res = filter(filterItems, (value) => {
      if (typeof value === 'number' || typeof value === 'string') {
        return strArr.has(`${value}`);
      }
      const kind = value?.kind || '';
      const { label } = value;

      return strArr.has(kind.toLowerCase()) || strArr.has(label.toLowerCase())
        || strArr.has(kind) || strArr.has(label);
    });

    return res;
  }

  return [];
};

const defaultFiltersQueryValues: FilterValues = {
  years: [],
  voices: [],
  genres: [],
  seasons: [],
  order: [],
  kinds: [],
};

const initialState: FiltersState = {
  filterType: ECollection.anime,
  filtersLoading: { years: ELoadingStatus.pending },
  animeFilters: {
    years: [],
    voices: [],
    genres: FILTER_GENRES,
    seasons: FILTER_SEASONS,
  },
  mangaFilters: {
    genres: FILTER_GENRES,
    kinds: MANGA_FILTER_KINDS,
    order: FILTER_ORDERS_BY,
  },
  // filter values from query
  filtersQueryValues: defaultFiltersQueryValues,
};

const HYDRATE = getAppHydrate();

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setYears: (
      state,
      { payload }: PayloadAction<number[] | []>,
    ) => ({ ...state, animeFilters: { ...state.animeFilters, years: payload } }),
    setFilterType: (
      state,
      { payload }: PayloadAction<ECollectionType>,
    ) => ({ ...state, filterType: payload, filtersQueryValues: defaultFiltersQueryValues }),
    setFilterValue: (
      state,
      { payload }: PayloadAction<Partial<FilterValues>>,
    ) => {
      state.filtersQueryValues = { ...state.filtersQueryValues, ...payload };
    },
    cleanFilterValues: (state) => {
      state.filtersQueryValues = defaultFiltersQueryValues;
    },
    setFilterValuesFromQuery: (
      state,
      {
        payload: { filterTypeWithKey, filterQueryValues },
      }: PayloadAction<{ filterTypeWithKey: FilterTypeWithKey, filterQueryValues: string[] }>,
    ) => {
      const { animeFilters, mangaFilters } = state;
      const [type, filterKey] = filterTypeWithKey;
      const currentFilters = type === ECollection.anime ? animeFilters[filterKey] : mangaFilters[filterKey];

      state.filtersQueryValues = {
        ...state.filtersQueryValues,
        [filterKey]: intersect(currentFilters, filterQueryValues),
      };
    },
    setOrDeleteFilterLoadingKey: (
      state,
      {
        payload: { filterKey, isDelete, loadingStatus },
      }: PayloadAction<{ filterKey: FiltersKeyses, loadingStatus?: EFilterLoadingType, isDelete?: boolean }>,
    ) => {
      if (isDelete) {
        delete state.filtersLoading[filterKey];
        return;
      }
      if (loadingStatus) {
        state.filtersLoading[filterKey] = loadingStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => ({
        ...state,
        ...action.payload.filters,
      }));
  },
});

export const {
  setYears,
  setFilterType,
  setFilterValue,
  cleanFilterValues,
  setFilterValuesFromQuery,
  setOrDeleteFilterLoadingKey,
} = filtersSlice.actions;

export const getFilters = ({ filters }: AppState) => filters;
export const filtersReducer = filtersSlice.reducer;

export const fetchFilterYears = createAsyncThunk(
  FETCH_FILTER_YEARS,
  async (_, { dispatch }) => {
    dispatch(setOrDeleteFilterLoadingKey({ filterKey: 'years', loadingStatus: EFilterLoading.pending }));
    try {
      const years = await getYears();
      if (!years.length) {
        dispatch(setOrDeleteFilterLoadingKey({ filterKey: 'years', loadingStatus: EFilterLoading.error }));
        return;
      }
      dispatch(setYears(years));
      dispatch(setOrDeleteFilterLoadingKey({ filterKey: 'years', isDelete: true }));
    } catch (error) {
      dispatch(
        setOrDeleteFilterLoadingKey({ filterKey: 'years', loadingStatus: EFilterLoading.error }),
      );
    }
  },
);
