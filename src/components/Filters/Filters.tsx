import { FC } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

import { ECollection, EFilter, ELinkPath } from '@enums/enums';

import {
  cleanFilterValues, getFilters, setFilterValue,
} from '@redux/slices/filters';

import Link from '@ui/Link';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import generateQuery from '@utils/api/generateQuery';
import entries from '@utils/object/entries';

import useFiltersStyles from './Filters.styles';

type FiltersProps = {
  className?: string;
  onFiltersAcceptCallback?: () => void;
};

const Filters: FC<FiltersProps> = ({ className, onFiltersAcceptCallback }) => {
  const classes = useFiltersStyles();
  const dispatch = useAppDispatch();
  const { filterType, filterItems, filterValues } = useAppSelector(getFilters);
  const currentLinkPath = filterType === ECollection.anime ? ELinkPath.animes : ELinkPath.mangas;
  const generatedQuery = generateQuery(
    filterValues,
    {
      seasons: 'kind',
      genres: filterType === 'anime' ? 'label' : 'kind',
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
        entries(filterItems).map(([key, value]) => {
          if (filterType === ECollection.manga && (key === 'years' || key === 'seasons')) return null;

          return (value.length
            ? <FormControl key={key} sx={{ m: 1, width: 300 }}>
              <Autocomplete
                multiple
                fullWidth
                id="tags-outlined"
                sx={{ width: 300 }}
                value={filterValues[key]}
                classes={{ root: classes.label, inputRoot: classes.inputRoot, paper: classes.paper }}
                onChange={(_, filterValue, reason) => {
                  if (reason === 'removeOption') {
                    dispatch(setFilterValue({ [key]: filterValue }));
                    return;
                  }

                  dispatch(setFilterValue({ [key]: filterValue }));
                }}
                options={value.map((option) => (
                  typeof option === 'number' ? `${option}` : option))
                }
                renderInput={
                  (params) => <TextField {...params} label={EFilter[key]} variant="outlined" />
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
    </div>
  );
};

export default Filters;
