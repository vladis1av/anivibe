import axios from 'redaxios';

import {
  Anime, AnimeKeys, AnimeResponse,
} from '@interfaces/anime';
import { FilteredProps } from '@interfaces/services';

import isAnimeResponseError from '@typeGuards/isAnimeResponseError';

import generateQuery from '@utils/api/generateQuery';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { ANIME_API } } = getNextEnv();

export const getFilteredData = async <
  T extends AnimeKeys, R extends Array<Pick<Anime, T>> | [], E = null>({
  method,
  filters,
  params,
}: FilteredProps<T>): Promise<R | E | null> => {
  try {
    const generatedQuery = generateQuery({ filter: filters, ...params });

    const { data } = await axios.get<R>(encodeURI(`${ANIME_API}${method}?${generatedQuery}`));

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAnimeByCode = async (code: string): Promise<Anime | null> => {
  try {
    const {
      data,
    } = await axios.get<AnimeResponse>(encodeURI(`${ANIME_API}getTitle?code=${code}&playlist_type=array`));

    if (isAnimeResponseError(data)) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getYears = async (): Promise<number[] | []> => {
  try {
    const { data } = await axios.get(encodeURI(`${ANIME_API}getYears`));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
