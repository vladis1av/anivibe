import { FC } from 'react';

import { useRouter } from 'next/router';

import { Pagination } from '@mui/material';
import clsx from 'clsx';

import { ELoadingStatus } from '@enums/enums';

import { LOADED_ALL_TITLES, LOAD_MORE, NOT_FOUND_TITLES } from '@constants/common';
import { FILTER_MENU_MATCH_MEDIA, PAGINATION_MATCH_MEDIA } from '@constants/matchMedia';

import { getFilterDataState } from '@redux/slices/filteredData';

import Error from '@ui/Error';
import InfiniteLoadMore from '@ui/InfiniteLoadMore';
import PageDescription from '@ui/PageDescription';

import FilterCardList from '@components/FilterCardList';
import FilterMenu from '@components/FilterMenu';

import useAppSelector from '@hooks/useAppSelector';
import useMatchMedia from '@hooks/useMatchMedia';

import useCommonStyles from '@styles/Common.styles';

import useFilterPageContentStyles from './FilterPageContent.styles';

type FilterPageContentProps = {
  title: string;
  description: string;
  currentPage?: number;
  totalPages?: number;
  loadMore?: () => void;
};

const FilterPageContent: FC<FilterPageContentProps> = ({
  title,
  description,
  currentPage,
  totalPages,
  loadMore,
}) => {
  const classes = useFilterPageContentStyles();
  const commonClasses = useCommonStyles();

  const {
    filteredData,
    loadingState,
  } = useAppSelector(getFilterDataState);

  const filteredDataIsNotFound = !filteredData.length;
  const dataError = loadingState === ELoadingStatus.error;
  const dataPending = loadingState === ELoadingStatus.pending;

  const route = useRouter();
  const { query } = route;

  const setPage = (page: number) => {
    if (totalPages && page <= totalPages) {
      query.page = `${page}`;
      route.push({ ...route });
    }
  };

  const [isMobileFilterMenu] = useMatchMedia(FILTER_MENU_MATCH_MEDIA);
  const [isMobilePagination] = useMatchMedia(PAGINATION_MATCH_MEDIA);

  const getPagination = (className: string) => {
    if (!totalPages) {
      return null;
    }

    return (
      <div className={className}>
        <Pagination
          page={currentPage}
          size={isMobilePagination ? 'small' : 'large'}
          shape="rounded"
          count={totalPages}
          onChange={(_, muiPage) => setPage(muiPage)}
        />
      </div>
    );
  };

  return <div className={classes.contentWrapper}>
    <PageDescription title={title} description={description} className={classes.pageDescription}/>
    {getPagination(classes.paginationWrapperTop)}

    <div className={clsx(classes.content, { [commonClasses.fullHeight]: filteredDataIsNotFound }) }>
      <div className={classes.filterCardListWrapper}>
        {
          !filteredData.length
            ? <Error errorText={NOT_FOUND_TITLES} />
            : <FilterCardList filteredList={filteredData} />
        }

        {
          loadMore && <InfiniteLoadMore
            isPending={dataPending}
            isError={dataError}
            loadMore={loadMore}
            errorText={LOADED_ALL_TITLES}
            defaultText={LOAD_MORE}
          />
        }

        {getPagination(classes.paginationWrapperBottom)}
      </div>

      <FilterMenu isDesktopOrBelow={isMobileFilterMenu} />
    </div>
  </div>;
};

export default FilterPageContent;
