import { FC } from 'react';

import { useRouter } from 'next/router';

import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Paper, { PaperProps } from '@mui/material/Paper';
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
import SkeletonBlock from '@ui/Skeletons/Block';

import AdBanner from '@components/AdBanner';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import generateQuery from '@utils/api/generateQuery';

import useFiltersStyles from './Filters.styles';

const CustomPaper = (props: PaperProps) => <Paper {...props} sx={{ borderRadius: 3, marginTop: 1 }}/>;

type FiltersProps = {
  className?: string;
  onFiltersAccept?: (page?: number, cleanParams?: boolean) => void;
};

const Filters: FC<FiltersProps> = ({ className, onFiltersAccept }) => {
  const classes = useFiltersStyles();
  const dispatch = useAppDispatch();
  const {
    filterType,
    mangaFilters,
    animeFilters,
    filtersQueryValues,
    filtersLoading,
  } = useAppSelector(getFilters);
  const route = useRouter();

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

  const cleanFilters = () => {
    dispatch(cleanFilterValues());

    if (onFiltersAccept) {
      onFiltersAccept(1, true);
    }

    route.push({ pathname: currentLinkPath });
  };

  const onFilterAccept = () => {
    if (onFiltersAccept) {
      onFiltersAccept(1);
    }
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
            return <SkeletonBlock key={key} width={300} height={56} />;
          }

          return (value && value.length
            ? <FormControl key={key} sx={{
              m: 1,
              width: 300,
              '& .MuiPopper-root': {
                borderRadius: 12,
              },

            }}>
              <Autocomplete
                fullWidth
                disablePortal={true}
                id="tags-outlined"
                PaperComponent={CustomPaper}
                sx={{
                  width: 300,
                  '& .MuiPopper-root': {
                    borderRadius: 12,
                  },
                }}
                value={currentValue}
                multiple={!isOrderByKey}
                isOptionEqualToValue={
                  (option, equalToValue) => {
                    if (typeof option === 'string' || typeof equalToValue === 'string') {
                      return option === equalToValue;
                    }
                    return option.kind === equalToValue?.kind;
                  }
                }
                onChange={(_, filterValue, reason) => {
                  if (filterValue) {
                    if (reason === 'removeOption') {
                      dispatch(setFilterValue({
                        filterKey: currentKey,
                        filterQueryValue: { [currentKey]: filterValue },
                      }));
                      return;
                    }
                    if (Array.isArray(filterValue)) {
                      dispatch(setFilterValue({
                        filterKey: currentKey,
                        filterQueryValue: { [currentKey]: filterValue },
                      }));
                      return;
                    }
                    dispatch(setFilterValue({
                      filterKey: currentKey,
                      filterQueryValue: { [currentKey]: [filterValue] },
                    }));
                  }
                }}
                options={value.map((option) => (
                  typeof option === 'number' ? `${option}` : option))
                }
                renderInput={
                  (params) => <TextField {...params} label={EFilter[currentKey]} variant="outlined" />
                }
                classes={{
                  root: classes.label, inputRoot: classes.inputRoot, paper: classes.paper,
                }}
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
            Сбросить
        </Button>

        <Link path={currentLinkPath} query={generatedQuery} shallow>
          <Button className={classes.acceptButton} variant="outlined" onClick={onFilterAccept}>Применить</Button>
        </Link>
      </div>

      <AdBanner
        blockId="R-A-6034750-1"
        className={classes.adBanner}
        renderTo="yandex_rtb_R-A-6034750-1"
      />
    </div>
  );
};

export default Filters;
