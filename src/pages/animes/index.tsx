import { FC } from 'react';

import { useRouter } from 'next/router';

import { AnimeQuery } from '@interfaces/query';

import { EAnimeMethod, ECollection } from '@enums/enums';

import {
  ANIME_DESCRIPTION,
  ANIME_TITLE,
  API_ITEMS_LIMIT,
  DEFAULT_CURRENT_YEAR,
} from '@constants/common';
import { ANIME_FILTERS_PAGE_DESCRIPTION, ANIME_FILTERS_PAGE_KEYWORDS, ANIME_FILTERS_PAGE_TITLE } from '@constants/seo';

import {
  fetchFilteredData,
  getFilterDataState,
  setFilteredData,
} from '@redux/slices/filteredData';
import {
  setYears, setFilterType,
} from '@redux/slices/filters';
import { nextReduxWrapper } from '@redux/store';

import FilterPageContent from '@components/FilterPageContent';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getFilteredData, getYears } from '@services/api/anime';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import setFiltersFromQuery from '@utils/store/setFiltersFromQuery';

type AnimesProps = {
  fullUrl: string;
};

const Animes: FC<AnimesProps> = ({ fullUrl }) => {
  const {
    filteredData,
  } = useAppSelector(getFilterDataState);
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { query } = route;
  const {
    years, genres, seasons, voices,
  } = query as unknown as AnimeQuery;

  const loadMore = () => {
    dispatch(fetchFilteredData({
      filteredDataType: ECollection.anime,
      loadMore: true,
      params: {
        year: years || DEFAULT_CURRENT_YEAR,
        season_code: seasons,
        genres,
        voice: voices,
        after: `${filteredData.length}`,
        items_per_page: `${API_ITEMS_LIMIT}`,
      },
    }));
  };

  return (
    <MainLayout full paddings fullHeight>
      <SeoHead
        canonical={fullUrl}
        ogUrl={fullUrl}
        tabTitle={ANIME_FILTERS_PAGE_TITLE}
        title={ANIME_FILTERS_PAGE_TITLE}
        description={ANIME_FILTERS_PAGE_DESCRIPTION}
        keywords={ANIME_FILTERS_PAGE_KEYWORDS}
      />

      <FilterPageContent
        title={ANIME_TITLE}
        description={ANIME_DESCRIPTION}
        loadMore={loadMore}
      />

    </MainLayout>
  );
};

export const getServerSideProps = nextReduxWrapper.getServerSideProps(
  (store) => async ({ query, resolvedUrl }) => {
    const fullUrl = getFullUrlFromServerSide(resolvedUrl);
    const { filters: { filterType, filterItems } } = store.getState();

    const {
      years, genres, seasons,
    } = query as unknown as AnimeQuery;
    const currentCollectionType = ECollection.anime;
    const params = {
      year: years || DEFAULT_CURRENT_YEAR,
      genres,
      season_code: seasons,
    };

    if (filterType === ECollection.manga) {
      store.dispatch(setFilterType(currentCollectionType));
    }

    const animes = await getFilteredData({
      method: EAnimeMethod.searchTitles,
      filters: [
        'id',
        'code',
        'names',
      ],
      params: { ...params, items_per_page: `${API_ITEMS_LIMIT}` },
    });

    // if i use store.dispatch(fetchFilteredData) doesn't work all the time, i dont know why ( maybe HYDRATE
    if (animes && animes.list.length) {
      store.dispatch(setFilteredData({ data: animes.list }));
    }

    if (!filterItems.years.length) {
      const yearsRes = await getYears();
      store.dispatch(setYears(yearsRes));
    }

    setFiltersFromQuery(store, { years, genres, seasons });

    return {
      props: { fullUrl },
    };
  },
);

export default Animes;
