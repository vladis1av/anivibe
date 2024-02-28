import { FC, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { AnimePageQuery } from '@interfaces/anime/pageQuery';
import { QueryType } from '@interfaces/query';

import { ECollection } from '@enums/enums';

import {
  ANIME_DESCRIPTION,
  ANIME_TITLE,
  API_FILTER_ITEMS_LIMIT,
} from '@constants/common';
import { ANIME_FILTERS_PAGE_DESCRIPTION, ANIME_FILTERS_PAGE_KEYWORDS, ANIME_FILTERS_PAGE_TITLE } from '@constants/seo';

import {
  fetchFilteredData,
  getFilterDataState,
} from '@redux/slices/filteredData';
import {
  getFilters, setFilterType, cleanFilterValues, fetchFilterYears,
} from '@redux/slices/filters';

import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import setFiltersFromQuery from '@utils/store/setFiltersFromQuery';

const FilterPageContent = dynamic(() => import('@components/FilterPageContent'), { ssr: false });

type AnimesProps = {
  fullUrl: string;
};

const Animes: FC<AnimesProps> = ({ fullUrl }) => {
// временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  const { filteredData } = useAppSelector(getFilterDataState);
  const { animeFilters, filterType } = useAppSelector(getFilters);

  const dispatch = useAppDispatch();
  const route = useRouter();
  const { query } = route as unknown as QueryType<AnimePageQuery>;

  const getFilteredAnimes = (currentQuery: AnimePageQuery, isLoadMore: boolean = false) => {
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
        after: totalItemsLength && isLoadMore ? totalItemsLength : undefined,
        items_per_page: API_FILTER_ITEMS_LIMIT,
      },
    }));
  };

  const loadMore = () => getFilteredAnimes(query, true);

  const getFilterYears = () => {
    if (!animeFilters.years.length) {
      dispatch(fetchFilterYears());
    }
  };

  useEffect(() => {
    if (filterType !== ECollection.anime) {
      dispatch(setFilterType(ECollection.anime));
    }
    return () => {
      dispatch(cleanFilterValues());
    };
  }, []);

  useEffect(() => {
    getFilterYears();
  }, [animeFilters.years]);

  useEffect(() => {
    setFiltersFromQuery(dispatch, [ECollection.anime, query]);
  }, [query, animeFilters.years]);

  useEffect(() => {
    getFilteredAnimes(query, false);
  }, [query.years, query.genres, query.seasons]);

  return (
    <ContentLayout full paddings>
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
    </ContentLayout>
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
  //   params: { ...params, items_per_page: API_FILTER_ITEMS_LIMIT },
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
