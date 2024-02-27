import { FC } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Pagination } from '@mui/material';
import clsx from 'clsx';

import {
  ECollection, ELinkPath, ELoadingStatus,
} from '@enums/enums';

import { LOADED_ALL_TITLES, LOAD_MORE, NOT_FOUND_TITLES } from '@constants/common';
import { FILTER_MENU_MATCH_MEDIA, PAGINATION_MATCH_MEDIA } from '@constants/matchMedia';

import { getFilterDataState } from '@redux/slices/filteredData';
import { getFilters } from '@redux/slices/filters';

import Error from '@ui/Error';
import InfiniteLoadMore from '@ui/InfiniteLoadMore';
import PageDescription from '@ui/PageDescription';
import CardItemSkeleton from '@ui/Skeletons/CardItem/CardItem';

import FilterCardList from '@components/FilterCardList';
import FilterMenu from '@components/FilterMenu';

import useAppSelector from '@hooks/useAppSelector';
import useMatchMedia from '@hooks/useMatchMedia';

import getEmptyArray from '@utils/array/getEmptyArray';

import useCommonStyles from '@styles/Common.styles';

import useFilterPageContentStyles from './FilterPageContent.styles';

const AdBanner = dynamic(() => import('@components/AdBanner'), { ssr: false });

type FilterPageContentProps = {
  title: string;
  description: string;
  page?: number;
  totalPages?: number;
  loadMore?: () => void;
  onFiltersAccept?: (page?: number, cleanParams?: boolean) => void;
};

const emptyArray = getEmptyArray(12);

const FilterPageContent: FC<FilterPageContentProps> = ({
  title,
  description,
  page,
  totalPages,
  loadMore,
  onFiltersAccept,
}) => {
  const classes = useFilterPageContentStyles();
  const commonClasses = useCommonStyles();
  const {
    page: currentPage,
    pages,
    filteredData,
    loadingState,
  } = useAppSelector(getFilterDataState);
  const { filterType } = useAppSelector(getFilters);

  const currentPagesTotal = pages || totalPages;
  const filteredDataIsNotFound = !filteredData.length;
  const dataError = loadingState === ELoadingStatus.error;
  const dataPending = loadingState === ELoadingStatus.pending;

  const route = useRouter();
  const { query } = route;

  const setPage = (queryPage: number) => {
    if (currentPagesTotal && queryPage <= currentPagesTotal) {
      const path = filterType === ECollection.anime ? ELinkPath.animes : ELinkPath.mangas;
      route.push({ pathname: path, query: { ...query, page: queryPage } });

      if (onFiltersAccept) {
        onFiltersAccept(queryPage);
      }
    }
  };

  const [isMobileFilterMenu] = useMatchMedia(FILTER_MENU_MATCH_MEDIA);
  const [isMobilePagination] = useMatchMedia(PAGINATION_MATCH_MEDIA);

  const getPagination = (className: string) => {
    if (!currentPagesTotal) {
      return null;
    }
    return (
      <div className={className}>
        <Pagination
          page={currentPage || page }
          size={isMobilePagination ? 'small' : 'large'}
          shape="rounded"
          count={currentPagesTotal}
          onChange={(_, muiPage) => setPage(muiPage)}
        />
      </div>
    );
  };

  return <div className={classes.contentWrapper}>
    <PageDescription title={title} description={description} className={classes.pageDescription}/>

    <AdBanner
      blockId="R-A-6034750-2"
      className={classes.adBanner}
      renderTo="yandex_rtb_R-A-6034750-2"
      style={{ maxHeight: 300, maxWidth: 1468 }}
    />

    {getPagination(classes.paginationWrapperTop)}

    <div className={clsx(classes.content, { [commonClasses.fullHeight]: filteredDataIsNotFound }) }>
      <div className={classes.filterCardListWrapper}>

        {
          filteredDataIsNotFound && dataError && <Error errorText={NOT_FOUND_TITLES} />
        }

        {
          !filteredDataIsNotFound && <FilterCardList filteredList={filteredData} />
        }

        <div className={classes.loadMoreCardItemList}>
          {loadMore && dataPending && !filteredData.length && emptyArray.map((_, i) => <CardItemSkeleton
            key={i}
            withTextSkeleton={true}
            className={classes.cardItemSkeleton}
          />)}
        </div>

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

      <FilterMenu isDesktopOrBelow={isMobileFilterMenu} onFiltersAccept={onFiltersAccept} />
    </div>
  </div>;
};

export default FilterPageContent;
