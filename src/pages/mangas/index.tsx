import { FC } from 'react';

import dynamic from 'next/dynamic';

import { MangaPageQuery } from '@interfaces/manga/pageQuery';
import { EMangaReleaseKinds } from '@interfaces/manga/service';

import { ECollection, EMangaOrderBy, EMangaReleaseKind } from '@enums/enums';

import { API_FILTER_ITEMS_LIMIT } from '@constants/common';
import { MANGA_FILTERS_PAGE_KEYWORDS } from '@constants/seo';

import {
  fetchFilteredData, setFilteredData, setLoadingState,
} from '@redux/slices/filteredData';
import { getFilters, setFilterType, setFilterValue } from '@redux/slices/filters';
import { nextReduxWrapper } from '@redux/store';

import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import { getMangas } from '@services/api/manga';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import getMangaFilterDescription from '@utils/seo/getMangaFilterDescription';
import getMangaFilterDescriptionPage from '@utils/seo/getMangaFilterDescriptionPage';
import getMangaFilterTitle from '@utils/seo/getMangaFilterTitle';
import setFiltersFromQuery from '@utils/store/setFiltersFromQuery';

const FilterPageContent = dynamic(() => import('@components/FilterPageContent'), { ssr: false });

type MangaPageProps = {
  page: number;
  pagesCount: number;
  fullUrl: string;
};

const Mangas: FC<MangaPageProps> = ({
  page,
  pagesCount,
  fullUrl,
}) => {
  const { filtersQueryValues: { pageType } } = useAppSelector(getFilters);
  const {
    serviceQueryValues,
  } = useAppSelector(getFilters);

  const dispatch = useAppDispatch();
  const currentPageType = pageType || EMangaReleaseKind.manga;
  const seoTitle = getMangaFilterTitle(currentPageType);

  const {
    page: queryPage = page,
    kinds,
    order,
    genres,
  } = serviceQueryValues;

  const getFilteredMangas = (currentPage?: number, cleanParams?: boolean) => {
    const params = cleanParams
      ? {
        page: 1,
        limit: API_FILTER_ITEMS_LIMIT,
      }
      : {
        page: currentPage || queryPage,
        kinds,
        order,
        genres,
        limit: API_FILTER_ITEMS_LIMIT,
      };

    dispatch(fetchFilteredData({
      filteredDataType: ECollection.manga,
      params,
    }));
  };

  return (
    <ContentLayout full paddings>
      <SeoHead
        ogUrl={fullUrl}
        title={seoTitle}
        tabTitle={seoTitle}
        canonical={fullUrl}
        keywords={MANGA_FILTERS_PAGE_KEYWORDS[currentPageType]}
        description={getMangaFilterDescription(currentPageType)}
      />

      <FilterPageContent
        totalPages={pagesCount}
        page={Number(queryPage)}
        onFiltersAccept={getFilteredMangas}
        title={getMangaFilterTitle(currentPageType, true)}
        description={getMangaFilterDescriptionPage(currentPageType)}
      />
    </ContentLayout>
  );
};

export const getServerSideProps = nextReduxWrapper
  .getServerSideProps<MangaPageProps>((store) => async ({ query, resolvedUrl }) => {
  const {
    page = '1', genres, kinds, order, pageType,
  } = query as unknown as MangaPageQuery;

  const { filters: { filterType } } = store.getState();
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);

  const currentPage = Number(page);
  const splittedKinds = kinds?.split(',') as EMangaReleaseKinds || [];

  if (filterType === ECollection.anime) {
    store.dispatch(setFilterType(ECollection.manga));
  }

  const mangas = await getMangas(
    {
      page: currentPage,
      genres: genres?.split(','),
      limit: API_FILTER_ITEMS_LIMIT,
      order: order || EMangaOrderBy.updated,
      kinds: pageType ? [pageType, ...splittedKinds] : splittedKinds,
    },
  );

  const currentCount = mangas?.pageNavParams?.count || 0;
  const pagesCount = Math.ceil(currentCount / API_FILTER_ITEMS_LIMIT);
  const mangasPage = mangas?.pageNavParams?.page || null;

  if (mangas && mangas.response?.length) {
    store.dispatch(setFilteredData({ page: mangasPage, pages: pagesCount, data: mangas.response }));
  } else {
    store.dispatch(setLoadingState('error'));
  }

  if (pageType) {
    store.dispatch(setFilterValue({ filterKey: 'pageType', filterQueryValue: { pageType } }));
    // if (filterType === ECollection.manga) {
  //   store.dispatch(setFilterType(currentCollectionType));
  // }
  }

  setFiltersFromQuery(store.dispatch, [ECollection.manga, {
    genres, order, kinds: pageType ? `${pageType},${kinds}` : kinds,
  }]);

  return {
    props: {
      page: currentPage, pagesCount, fullUrl,
    },
  };
});

export default Mangas;
