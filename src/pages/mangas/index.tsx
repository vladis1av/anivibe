import { FC } from 'react';

import { useRouter } from 'next/router';

import Pagination from '@mui/material/Pagination';
import clsx from 'clsx';

import { MangaQuery } from '@interfaces/query';

import { ECollection } from '@enums/enums';

import {
  API_ITEMS_LIMIT, MANGA_DESCRIPTION, MANGA_TITLE, NOT_FOUND_TITLES,
} from '@constants/common';
import { FILTER_MENU_MATCH_MEDIA, PAGINATION_MATCH_MEDIA } from '@constants/matchMedia';
import { MANGA_FILTERS_PAGE_DESCRIPTION, MANGA_FILTERS_PAGE_KEYWORDS, MANGA_FILTERS_PAGE_TITLE } from '@constants/seo';

import { getFilterDataState, setFilteredData } from '@redux/slices/filteredData';
import { setFilterType, setFilterValuesFromQuery } from '@redux/slices/filters';
import { nextReduxWrapper } from '@redux/store';

import Error from '@ui/Error';
import PageDescription from '@ui/PageDescription/PageDescription';

import FilterCardList from '@components/FilterCardList';
import FilterMenu from '@components/FilterMenu';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getMangas } from '@services/api/manga';

import useAppSelector from '@hooks/useAppSelector';
import useMatchMedia from '@hooks/useMatchMedia';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import entries from '@utils/object/entries';

import useCommonStyles from '@styles/Common.styles';
import useFilterPageStyles from '@styles/FilterPage.styles';

type MangaPageProps = {
  pagesCount: number;
  page: number;
  fullUrl: string;
};

const Mangas: FC<MangaPageProps> = ({ pagesCount, page, fullUrl }) => {
  const classes = useFilterPageStyles();
  const commonClasses = useCommonStyles();

  const {
    filteredData,
  } = useAppSelector(getFilterDataState);
  const filteredDataIsNotFound = !filteredData.length;
  const route = useRouter();
  const { query } = route;

  const setPage = (currentPage: number) => {
    if (currentPage > pagesCount) {
      return;
    }
    query.page = `${currentPage}`;
    route.push({ ...route });
  };

  const [isMobileFilterMenu] = useMatchMedia(FILTER_MENU_MATCH_MEDIA);
  const [isMobilePagination] = useMatchMedia(PAGINATION_MATCH_MEDIA);

  const getPagination = (className: string) => {
    if (!pagesCount) {
      return null;
    }

    return (
      <div className={className}>
        <Pagination
          page={page}
          size={isMobilePagination ? 'small' : 'large'}
          shape="rounded"
          count={pagesCount}
          onChange={(_, muiPage) => setPage(muiPage)}
        />
      </div>
    );
  };

  return (
    <MainLayout full paddings fullHeight>
      <SeoHead
        canonical={fullUrl}
        ogUrl={fullUrl}
        tabTitle={MANGA_FILTERS_PAGE_TITLE}
        title={MANGA_FILTERS_PAGE_TITLE}
        description={MANGA_FILTERS_PAGE_DESCRIPTION}
        keywords={MANGA_FILTERS_PAGE_KEYWORDS}
      />

      <div className={classes.contentWrapper}>
        <PageDescription title={MANGA_TITLE} description={MANGA_DESCRIPTION} className={classes.pageDescription}/>
        {getPagination(classes.paginationWrapperTop)}

        <div className={clsx(classes.content, { [commonClasses.fullHeight]: filteredDataIsNotFound }) }>
          <div className={classes.filterCardListWrapper}>
            {
              !filteredData.length
                ? <Error errorText={NOT_FOUND_TITLES} />
                : <FilterCardList filteredList={filteredData} />
            }

            {getPagination(classes.paginationWrapperBottom)}
          </div>

          <FilterMenu isDesktopOrBelow={isMobileFilterMenu} />
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = nextReduxWrapper
  .getServerSideProps<MangaPageProps>((store) => async (
  { query, resolvedUrl },
) => {
  const { page = '1', genres } = query as unknown as MangaQuery;
  const { filters: { filterType } } = store.getState();
  const currentPage = Number(page);
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);

  if (filterType === ECollection.anime) {
    store.dispatch(setFilterType(ECollection.manga));
  }

  const mangas = await getMangas(
    {
      order: 'popular',
      limit: API_ITEMS_LIMIT,
      page: currentPage,
      genres,
    },
  );

  const currentCount = mangas?.pageNavParams?.count || 0;
  const pagesCount = Math.ceil(currentCount / API_ITEMS_LIMIT);

  if (mangas && mangas.response?.length) {
    store.dispatch(setFilteredData({ data: mangas.response }));
  }

  entries({ genres }).forEach(([key, value]) => {
    if (value) {
      const itemsFromQuery = value.split(',');
      store.dispatch(setFilterValuesFromQuery({ key, keyItems: itemsFromQuery }));
    }
  });

  return {
    props: { pagesCount, page: currentPage, fullUrl },
  };
});

export default Mangas;
