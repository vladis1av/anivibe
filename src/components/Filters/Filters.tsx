import { FC } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

import { ECollection, EFilter, ELinkPath } from '@enums/enums';

import {
  FiltersKeyses,
  cleanFilterValues,
  getFilters,
  setFilterValue,
} from '@redux/slices/filters';

import Link from '@ui/Link';
import TextSkeleton from '@ui/Skeletons/Text';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import generateQuery from '@utils/api/generateQuery';

import useFiltersStyles from './Filters.styles';

type FiltersProps = {
  className?: string;
  onFiltersAcceptCallback?: () => void;
};

const Filters: FC<FiltersProps> = ({ className, onFiltersAcceptCallback }) => {
  const classes = useFiltersStyles();
  const dispatch = useAppDispatch();
  const {
    filterType,
    mangaFilters,
    animeFilters,
    filtersQueryValues,
    filtersLoading,
  } = useAppSelector(getFilters);

  const isAnimeFiltersType = filterType === ECollection.anime;
  const filterItems = isAnimeFiltersType ? animeFilters : mangaFilters;
  const currentLinkPath = isAnimeFiltersType ? ELinkPath.animes : ELinkPath.mangas;

  const generatedQuery = generateQuery(
    filtersQueryValues,
    {
      seasons: 'kind',
      genres: filterType === 'anime' ? 'label' : 'kind',
      order: 'kind',
      kinds: 'kind',
    },
  );

  const onFiltersAccept = () => {
    if (onFiltersAcceptCallback) {
      onFiltersAcceptCallback();
    }
  };

  const cleanFilters = () => {
    dispatch(cleanFilterValues());
  };

  return (
    <div className={clsx(classes.filters, className)}>
      {
        Object.entries(filterItems).map(([key, value]) => {
          const currentKey = key as FiltersKeyses;
          const isOrderByKey = currentKey === 'order';
          const currentValue = isOrderByKey
            ? filtersQueryValues[currentKey][0]
            : filtersQueryValues[currentKey] || [];

          if (filtersLoading[currentKey] && filtersLoading[currentKey] === 'pending') {
            return <TextSkeleton width={300} height={56} />;
          }

          return (value && value.length
            ? <FormControl key={key} sx={{ m: 1, width: 300 }}>
              <Autocomplete
                multiple={!isOrderByKey}
                fullWidth
                id="tags-outlined"
                sx={{ width: 300 }}
                value={currentValue}
                classes={{ root: classes.label, inputRoot: classes.inputRoot, paper: classes.paper }}
                onChange={(_, filterValue, reason) => {
                  if (filterValue) {
                    if (reason === 'removeOption') {
                      dispatch(setFilterValue({ [currentKey]: filterValue }));
                      return;
                    }
                    if (!Array.isArray(filterValue)) {
                      dispatch(setFilterValue({ [currentKey]: [filterValue] }));
                      return;
                    }
                    dispatch(setFilterValue({ [currentKey]: filterValue }));
                  }
                }}
                options={value.map((option) => (
                  typeof option === 'number' ? `${option}` : option))
                }
                renderInput={
                  (params) => <TextField {...params} label={EFilter[currentKey]} variant="outlined" />
                }
              />
            </FormControl>
            : null
          );
        })
      }

      <div className={classes.filterButtonGroup}>
        <Button
          className={classes.filterButtonClean}
          variant="text"
          onClick={cleanFilters}
        >
          Очистить
        </Button>

        <Link path={currentLinkPath} query={ generatedQuery }>
          <Button variant="outlined" onClick={onFiltersAccept}>Применить</Button>
        </Link>
      </div>

      <ins className="mrg-tag"
        style={{ display: 'inline-block', width: 290, height: 600 }}
        data-ad-client="ad-1490635"
        data-ad-slot="1490635">
      </ins>
    </div>
  );
};

export default Filters;
