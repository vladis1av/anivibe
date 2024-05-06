import { FC, useEffect } from 'react';

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

import AdBanner from '@components/AdBanner';
import FilterCardList from '@components/FilterCardList';
import FilterMenu from '@components/FilterMenu';

import useAppSelector from '@hooks/useAppSelector';
import useMatchMedia from '@hooks/useMatchMedia';

import getEmptyArray from '@utils/array/getEmptyArray';
import onScrollTop from '@utils/window/onScrollTop';

import useCommonStyles from '@styles/Common.styles';

import useFilterPageContentStyles from './FilterPageContent.styles';

type FilterPageContentProps = {
  title: string;
  description: string;
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
  onFiltersAccept?: (page?: number, cleanParams?: boolean) => void;
};

const emptyArray = getEmptyArray(12);

const FilterPageContent: FC<FilterPageContentProps> = ({
  title,
  description,
  page,
  totalPages,
  onLoadMore,
  onFiltersAccept,
}) => {
  const classes = useFilterPageContentStyles();
  const commonClasses = useCommonStyles();
  const {
    page: currentPage,
    pages,
    loadMore,
    manga,
    anime,
    loadingState,
  } = useAppSelector(getFilterDataState);
  const { filterType } = useAppSelector(getFilters);

  const currentPagesTotal = pages || totalPages;
  const filteredDataIsNotFound = filterType === ECollection.anime ? !anime.length : !manga.length;
  const filteredData = filterType === ECollection.anime ? anime : manga;
  const dataError = loadingState === ELoadingStatus.error;
  const dataPending = loadingState === ELoadingStatus.pending;

  const route = useRouter();
  const { query } = route;

  const onHistoryBack = (queryPage: number) => {
    if (onFiltersAccept) {
      onFiltersAccept(queryPage);
      onScrollTop();
    }
  };

  const setPage = (paginationPage: number) => {
    if (currentPagesTotal && paginationPage <= currentPagesTotal) {
      const path = filterType === ECollection.anime ? ELinkPath.animes : ELinkPath.mangas;
      route.push({ pathname: path, query: { ...query, page: paginationPage } }, undefined, { shallow: true });

      onScrollTop();
    }
  };

  const [isMobileFilterMenu] = useMatchMedia(FILTER_MENU_MATCH_MEDIA);
  const [isMobilePagination] = useMatchMedia(PAGINATION_MATCH_MEDIA);

  useEffect(() => {
    if (query.page) {
      onHistoryBack(Number(query.page));
    }
  }, [query.page]);

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

  const getInfiniteLoader = () => {
    if (loadMore && onLoadMore) {
      return (
        <InfiniteLoadMore
          isError={dataError}
          isPending={dataPending}
          onLoadMore={onLoadMore}
          defaultText={LOAD_MORE}
          errorText={LOADED_ALL_TITLES}
        />
      );
    }
    return null;
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

        {getInfiniteLoader()}

        {getPagination(classes.paginationWrapperBottom)}
      </div>

      <FilterMenu isDesktopOrBelow={isMobileFilterMenu} onFiltersAccept={onFiltersAccept} />
    </div>
  </div>;
};

export default FilterPageContent;
