import { FC, useEffect } from 'react';

import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import { AnimePageQuery } from '@interfaces/anime/pageQuery';
import { QueryType } from '@interfaces/query';

import { ECollection } from '@enums/enums';

import {
  ANIME_TITLE,
  ANIME_DESCRIPTION,
  API_FILTER_ITEMS_LIMIT,
} from '@constants/common';
import {
  ANIME_FILTERS_PAGE_TITLE,
  ANIME_FILTERS_PAGE_KEYWORDS,
  ANIME_FILTERS_PAGE_DESCRIPTION,
} from '@constants/seo';

import {
  setLoadMore,
  fetchFilteredData,
  getFilterDataState,
} from '@redux/slices/filteredData';
import {
  getFilters,
  setFilterType,
  fetchFilterYears,
  cleanFilterValues,
} from '@redux/slices/filters';

import FilterPageContent from '@components/FilterPageContent';
import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import setFiltersFromQuery from '@utils/store/setFiltersFromQuery';

type AnimesProps = {
  fullUrl: string;
};

const Animes: FC<AnimesProps> = ({ fullUrl }) => {
// временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  const { anime } = useAppSelector(getFilterDataState);
  const { animeFilters, filterType } = useAppSelector(getFilters);

  const dispatch = useAppDispatch();
  const route = useRouter();
  const { query } = route as unknown as QueryType<AnimePageQuery>;

  const getFilteredAnimes = (currentQuery?: AnimePageQuery, isLoadMore: boolean = false) => {
    const totalItemsLength = anime.length;

    dispatch(fetchFilteredData({
      filteredDataType: ECollection.anime,
      loadMore: isLoadMore,
      params: {
        year: currentQuery?.years,
        season_code: currentQuery?.seasons,
        genres: currentQuery?.genres,
        voice: currentQuery?.voices,
        after: totalItemsLength && isLoadMore ? totalItemsLength : undefined,
        items_per_page: API_FILTER_ITEMS_LIMIT,
      },
    }));
  };

  const onLoadMore = () => { getFilteredAnimes(query, true); };

  const getFilterYears = () => {
    if (!animeFilters.years.length) {
      dispatch(fetchFilterYears());
    }
  };

  useEffect(() => {
    if (filterType !== ECollection.anime) {
      dispatch(setFilterType(ECollection.anime));
    }
    dispatch(setLoadMore(true));

    return () => {
      dispatch(cleanFilterValues());
      dispatch(setLoadMore(false));
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
        ogUrl={fullUrl}
        canonical={fullUrl}
        title={ANIME_FILTERS_PAGE_TITLE}
        tabTitle={ANIME_FILTERS_PAGE_TITLE}
        keywords={ANIME_FILTERS_PAGE_KEYWORDS}
        description={ANIME_FILTERS_PAGE_DESCRIPTION}
      />

      <FilterPageContent
        title={ANIME_TITLE}
        onLoadMore={onLoadMore}
        description={ANIME_DESCRIPTION}
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
