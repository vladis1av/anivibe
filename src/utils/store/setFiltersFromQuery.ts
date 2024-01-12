import { setFilterValuesFromQuery } from '@redux/slices/filters';
import { AppStore } from '@redux/store';

import { FilterQuery } from '../../redux/slices/filters';

const setFiltersFromQuery = (store: AppStore, params: FilterQuery) => {
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      const currentKey = key as keyof FilterQuery;
      const currentValue = value as string;
      const itemsFromQuery = currentValue.split(',');
      store.dispatch(setFilterValuesFromQuery({ key: currentKey, keyItems: itemsFromQuery }));
    }
  });
};

export default setFiltersFromQuery;
