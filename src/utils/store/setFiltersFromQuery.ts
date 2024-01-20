import { FilterQueryWithType, FilterTypeWithKey, setFilterValuesFromQuery } from '@redux/slices/filters';
import { AppDispatch } from '@redux/store';

const setFiltersFromQuery = (dispatch: AppDispatch, paramsWithType: FilterQueryWithType) => {
  const [type, params] = paramsWithType;
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      const itemsFromQuery = value.split(',');

      dispatch(setFilterValuesFromQuery({
        filterTypeWithKey: [type, key] as FilterTypeWithKey,
        filterQueryValues: itemsFromQuery,
      }));
    }
  });
};

export default setFiltersFromQuery;
