import { FC } from 'react';

import dynamic from 'next/dynamic';

import { MangaPageQuery } from '@interfaces/manga/pageQuery';
import { EMangaReleaseKinds } from '@interfaces/manga/service';

import { ECollection, EMangaOrderBy } from '@enums/enums';

import {
  API_FILTER_ITEMS_LIMIT, MANGA_DESCRIPTION, MANGA_TITLE,
} from '@constants/common';
import { MANGA_FILTERS_PAGE_DESCRIPTION, MANGA_FILTERS_PAGE_KEYWORDS, MANGA_FILTERS_PAGE_TITLE } from '@constants/seo';

import { setFilteredData, setLoadingState } from '@redux/slices/filteredData';
import { setFilterType } from '@redux/slices/filters';
import { nextReduxWrapper } from '@redux/store';

import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import { getMangas } from '@services/api/manga';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import setFiltersFromQuery from '@utils/store/setFiltersFromQuery';

const FilterPageContent = dynamic(() => import('@components/FilterPageContent'), { ssr: false });

type MangaPageProps = {
  page: number;
  pagesCount: number;
  fullUrl: string;
};

const Mangas: FC<MangaPageProps> = ({ page, pagesCount, fullUrl }) => (
  <ContentLayout full paddings>
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
  </ContentLayout>
);

export const getServerSideProps = nextReduxWrapper
  .getServerSideProps<MangaPageProps>((store) => async ({ query, resolvedUrl }) => {
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
      page: currentPage,
      genres: genres?.split(','),
      limit: API_FILTER_ITEMS_LIMIT,
      order: order || EMangaOrderBy.updated,
      kinds: kinds?.split(',') as EMangaReleaseKinds,
    },
  );

  const currentCount = mangas?.pageNavParams?.count || 0;
  const pagesCount = Math.ceil(currentCount / API_FILTER_ITEMS_LIMIT);

  if (mangas && mangas.response?.length) {
    store.dispatch(setFilteredData({ data: mangas.response }));
  } else {
    store.dispatch(setLoadingState('error'));
  }

  setFiltersFromQuery(store.dispatch, [ECollection.manga, { genres, order, kinds }]);

  return {
    props: { page: currentPage, pagesCount, fullUrl },
  };
});

export default Mangas;
