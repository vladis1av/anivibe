import { FC, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import { AnimeQuery, QueryType } from '@interfaces/query';

import { ECollection } from '@enums/enums';

import {
  ANIME_DESCRIPTION,
  ANIME_TITLE,
  API_ITEMS_LIMIT,
} from '@constants/common';
import { ANIME_FILTERS_PAGE_DESCRIPTION, ANIME_FILTERS_PAGE_KEYWORDS, ANIME_FILTERS_PAGE_TITLE } from '@constants/seo';

import {
  fetchFilteredData,
  getFilterDataState,
} from '@redux/slices/filteredData';
import {
  setYears, getFilters, setFilterValuesFromQuery, FilterQuery, setFilterType,
} from '@redux/slices/filters';

import FilterPageContent from '@components/FilterPageContent';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getYears } from '@services/api/anime';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';

type AnimesProps = {
  fullUrl: string;
};

const Animes: FC<AnimesProps> = ({ fullUrl }) => {
// временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  const { filteredData } = useAppSelector(getFilterDataState);
  const { filterItems, filterType } = useAppSelector(getFilters);

  const dispatch = useAppDispatch();
  const route = useRouter();
  const { query } = route as unknown as QueryType<AnimeQuery>;

  const getFilteredAnimes = async (currentQuery: AnimeQuery, isLoadMore: boolean = false) => {
    const totalItemsLength = filteredData.length;
    const {
      years, genres, seasons, voices,
    } = currentQuery;
    dispatch(fetchFilteredData({
      filteredDataType: ECollection.anime,
      loadMore: isLoadMore,
      params: {
        year: years,
        season_code: seasons,
        genres,
        voice: voices,
        after: totalItemsLength && isLoadMore ? `${totalItemsLength}` : undefined,
        items_per_page: `${API_ITEMS_LIMIT}`,
      },
    }));
  };

  const getFilterYears = async () => {
    if (!filterItems.years.length) {
      const yearsRes = await getYears();
      dispatch(setYears(yearsRes));
    }
  };

  useEffect(() => {
    if (filterType === ECollection.manga) {
      dispatch(setFilterType(ECollection.anime));
    }
  }, []);

  useEffect(() => {
    getFilterYears();
  }, [filterItems.years]);

  useEffect(() => {
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        const currentKey = key as keyof FilterQuery;
        const currentValue = value as string;
        const itemsFromQuery = currentValue.split(',');
        dispatch(setFilterValuesFromQuery({ key: currentKey, keyItems: itemsFromQuery }));
      }
    });
  }, [query, filterItems.years]);

  useEffect(() => {
    getFilteredAnimes(query, false);
  }, [query]);

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
        loadMore={() => getFilteredAnimes(query, true)}
      />
    </MainLayout>
  );
};

// временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
export const getServerSideProps: GetServerSideProps<AnimesProps> = async ({ resolvedUrl }) => {
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);
  // const { filters: { filterType } } = store.getState(); // { filterType, filterItems }

  // const {
  //   years, genres, seasons,
  // } = query as unknown as AnimeQuery;
  // const currentCollectionType = ECollection.anime;
  // const params = {
  //   year: years || DEFAULT_CURRENT_YEAR,
  //   genres,
  //   season_code: seasons,
  //   voice: voices,
  // };

  // if (filterType === ECollection.manga) {
  //   store.dispatch(setFilterType(currentCollectionType));
  // }

  // const animes = await getFilteredData({
  //   method: EAnimeMethod.searchTitles,
  //   filters: [
  //     'id',
  //     'code',
  //     'names',
  //   ],
  //   params: { ...params, items_per_page: `${API_ITEMS_LIMIT}` },
  // });

  // if i use store.dispatch(fetchFilteredData) doesn't work all the time, i dont know why ( maybe HYDRATE
  // if (animes && animes.list.length) {
  //   store.dispatch(setFilteredData({ data: animes.list }));
  // }

  // if (!filterItems.years.length) {
  //   const yearsRes = await getYears();
  //   store.dispatch(setYears(yearsRes));
  // }

  // setFiltersFromQuery(store, { years, genres, seasons });

  return {
    props: { fullUrl },
  };
};

export default Animes;
