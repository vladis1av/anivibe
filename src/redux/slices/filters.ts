import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ECollectionType } from '@interfaces/collection';
import {
  FilterGenreType, Values,
} from '@interfaces/common';

import { ECollection } from '@enums/enums';

import { filterSeasons, filterGenres } from '@constants/filters';

import { AppState } from '@redux/store';

import filter from '@utils/array/filter';
import getAppHydrate from '@utils/store/getAppHydrate';

export type FilterQuery = {
  years?: string;
  genres?: string;
  seasons?: string;
  voices?: string;
};

type FilterItems = {
  years: number[] | [];
  genres: FilterGenreType[];
  seasons: FilterGenreType[];
  voices: number[] | [];
};

type FilterValues = {
  years: string[] | [];
  genres: FilterGenreType[] | [];
  seasons: FilterGenreType[] | [];
  voices: string[] | [];
};

type FilterKeys = keyof FilterItems;

export type FiltersState = {
  filterType: ECollectionType;
  filterItems: FilterItems;
  filterValues: FilterValues;
};

const intersect = (filterItems: Values<FilterItems>, QueryKeys: string[]): (string | FilterGenreType)[] | [] => {
  if (filterItems.length && QueryKeys.length) {
    const strArr = new Set(QueryKeys);

    const res = filter(filterItems, (value) => {
      if (typeof value === 'number') {
        return strArr.has(`${value}`);
      }
      const kind = value?.kind || '';
      const { label } = value;

      return strArr.has(kind.toLowerCase()) || strArr.has(label.toLowerCase())
        || strArr.has(kind) || strArr.has(label);
    });

    if (res) return res.map((item) => (typeof item === 'number' ? `${item}` : item));

    return [];
  }

  return [];
};

const defaultFilterValues: FilterValues = {
  years: [],
  genres: [],
  seasons: [],
  voices: [],
};

const initialState: FiltersState = {
  filterType: ECollection.anime,
  filterItems: {
    years: [],
    genres: filterGenres,
    seasons: filterSeasons,
    voices: [],
  },
  // filter query
  filterValues: defaultFilterValues,
};

const HYDRATE = getAppHydrate();

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterType: (
      state,
      { payload }: PayloadAction<ECollectionType>,
    ) => ({ ...state, filterType: payload }),
    setYears: (
      state,
      { payload }: PayloadAction<number[] | []>,
    ) => ({ ...state, filterItems: { ...state.filterItems, years: payload } }),
    setFilterValuesFromQuery: (
      state,
      { payload: { key, keyItems } }: PayloadAction<{ key: FilterKeys, keyItems: string[] }>,
    ) => {
      const currentFilterItem = state.filterItems[key];
      state.filterValues = { ...state.filterValues, [key]: intersect(currentFilterItem, keyItems) };
    },
    setFilterValue: (
      state,
      { payload }: PayloadAction<Partial<FilterValues>>,
    ) => {
      state.filterValues = { ...state.filterValues, ...payload };
    },
    cleanFilterValues: (state) => {
      state.filterValues = defaultFilterValues;
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
  setFilterType,
  setYears,
  setFilterValue,
  setFilterValuesFromQuery,
  cleanFilterValues,
} = filtersSlice.actions;

export const getFilters = ({ filters }: AppState) => filters;

export const filtersReducer = filtersSlice.reducer;
