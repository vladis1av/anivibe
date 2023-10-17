import axios from 'redaxios';

import {
  Anime, AnimeKeys, AnimeResponse,
} from '@interfaces/anime';
import { ERuntimeValueType } from '@interfaces/common';
import { FilteredProps } from '@interfaces/services';

import isAnimeResponseError from '@typeGuards/isAnimeResponseError';

import generateQuery from '@utils/api/generateQuery';
import serverlessOrEdgeApi from '@utils/api/serverlessOrEdgeApi';
import getProcessEnv from '@utils/config/getProcessEnv';

// edge functions not support next.config.js {publicRuntimeConfig || serverRuntimeConfig} getConfig
const { ANIME_API, EDGE_FUNCTIONS_ANIME_API } = getProcessEnv();

export const getFilteredData = async <
  T extends AnimeKeys, R extends Array<Pick<Anime, T>> | [], E = null>({
  method,
  filters,
  params,
  runtime,
}: FilteredProps<T>): Promise<R | E | null> => {
  try {
    const generatedQuery = generateQuery({ filter: filters, ...params });
    const animeApi = serverlessOrEdgeApi(EDGE_FUNCTIONS_ANIME_API, ANIME_API, runtime);

    const { data } = await axios.get<R>(encodeURI(`${animeApi}${method}?${generatedQuery}`));

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAnimeByCode = async (code: string, runtime?: ERuntimeValueType): Promise<Anime | null> => {
  try {
    const animeApi = serverlessOrEdgeApi(EDGE_FUNCTIONS_ANIME_API, ANIME_API, runtime);

    const {
      data,
    } = await axios.get<AnimeResponse>(encodeURI(`${animeApi}getTitle?code=${code}&playlist_type=array`));

    if (isAnimeResponseError(data)) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getYears = async (runtime?: ERuntimeValueType): Promise<number[] | []> => {
  try {
    const animeApi = serverlessOrEdgeApi(EDGE_FUNCTIONS_ANIME_API, ANIME_API, runtime);

    const { data } = await axios.get(encodeURI(`${animeApi}getYears`));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
