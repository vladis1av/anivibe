import { FC } from 'react';

import { MangaPageQuery } from '@interfaces/manga/pageQuery';

import { ECollection, EMangaOrderBy } from '@enums/enums';

import {
  API_FILTER_ITEMS_LIMIT, MANGA_DESCRIPTION, MANGA_TITLE,
} from '@constants/common';
import { MANGA_FILTERS_PAGE_DESCRIPTION, MANGA_FILTERS_PAGE_KEYWORDS, MANGA_FILTERS_PAGE_TITLE } from '@constants/seo';

import { setFilteredData } from '@redux/slices/filteredData';
import { setFilterType } from '@redux/slices/filters';
import { nextReduxWrapper } from '@redux/store';

import FilterPageContent from '@components/FilterPageContent';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getMangas } from '@services/api/manga';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import setFiltersFromQuery from '@utils/store/setFiltersFromQuery';

type MangaPageProps = {
  pagesCount: number;
  page: number;
  fullUrl: string;
};

const Mangas: FC<MangaPageProps> = ({ pagesCount, page, fullUrl }) => (
  <MainLayout full paddings fullHeight>
    <SeoHead
      canonical={fullUrl}
      ogUrl={fullUrl}
      tabTitle={MANGA_FILTERS_PAGE_TITLE}
      title={MANGA_FILTERS_PAGE_TITLE}
      description={MANGA_FILTERS_PAGE_DESCRIPTION}
      keywords={MANGA_FILTERS_PAGE_KEYWORDS}
    />

    <FilterPageContent
      title={MANGA_TITLE}
      description={MANGA_DESCRIPTION}
      currentPage={Number(page)}
      totalPages={pagesCount}
    />
  </MainLayout>
);

export const getServerSideProps = nextReduxWrapper
  .getServerSideProps<MangaPageProps>((store) => async (
  { query, resolvedUrl },
) => {
  const {
    page = '1', genres, kinds, order,
  } = query as unknown as MangaPageQuery;
  const { filters: { filterType } } = store.getState();
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);
  const currentPage = Number(page);

  if (filterType === ECollection.anime) {
    store.dispatch(setFilterType(ECollection.manga));
  }

  const mangas = await getMangas(
    {
      kinds,
      genres,
      page: currentPage,
      limit: API_FILTER_ITEMS_LIMIT,
      order: order || EMangaOrderBy.updated,
    },
  );

  const currentCount = mangas?.pageNavParams?.count || 0;
  const pagesCount = Math.ceil(currentCount / API_FILTER_ITEMS_LIMIT);

  if (mangas && mangas.response?.length) {
    store.dispatch(setFilteredData({ data: mangas.response }));
  }

  setFiltersFromQuery(store.dispatch, [ECollection.manga, { genres, order, kinds }]);

  return {
    props: { pagesCount, page: currentPage, fullUrl },
  };
});

export default Mangas;
