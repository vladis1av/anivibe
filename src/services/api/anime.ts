import axios from 'redaxios';

import { Anime, AnimeKeys } from '@interfaces/anime';
import { FilteredProps } from '@interfaces/services';

import generateQuery from '@utils/generateQuery';
import getEnv from '@utils/getEnv';

const { publicRuntimeConfig: { ANIME_API } } = getEnv();

const currentAnimeApi = ANIME_API;

export const getFilteredData = async <
  T extends AnimeKeys, R extends Array<Pick<Anime, T>> | [], E = null>({
  method,
  filters,
  params,
}: FilteredProps<T>): Promise<R | E | null> => {
  try {
    const generatedQuery = generateQuery({ filter: filters, ...params });

    const { data } = await axios.get<R>(encodeURI(`${currentAnimeApi}${method}?${generatedQuery}`));

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAnimeByCode = async (id: string): Promise<Anime | null> => {
  try {
    const { data } = await axios.get(encodeURI(`${currentAnimeApi}getTitle?code=${id}&playlist_type=array`));

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getYears = async (): Promise<number[] | []> => {
  try {
    const { data } = await axios.get(encodeURI(`${currentAnimeApi}getYears`));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
