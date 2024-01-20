import axios from 'redaxios';

import {
  Anime, AnimeKeys,
} from '@interfaces/anime/anime';
import { AnimeResponse, AnimesResponse, AnimeFilteredDataProps } from '@interfaces/anime/service';

import isAnimeResponseError from '@typeGuards/isAnimeResponseError';

import generateQuery from '@utils/api/generateQuery';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { ANIME_API } } = getNextEnv();

export const getFilteredData = async <
  T extends AnimeKeys,
  R extends AnimesResponse<Array<Pick<Anime, T>>>,
>({
  method, //  api method
  filters, // what values will be in the response
  params, //  query params
}: AnimeFilteredDataProps<T>): Promise<R | null> => {
  try {
    const generatedQuery = generateQuery({ filter: filters, ...params });

    const { data } = await axios.get<R>(encodeURI(`${ANIME_API}${method}?${generatedQuery}`));

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAnimeById = async (id: string): Promise<Anime | null> => {
  try {
    const {
      data,
    } = await axios.get<AnimeResponse>(encodeURI(`${ANIME_API}title?id=${id}&playlist_type=array`));

    if (isAnimeResponseError(data)) {
      console.error(data.error);
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
    const { data } = await axios.get(encodeURI(`${ANIME_API}years`));

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
