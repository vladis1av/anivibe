import getConfig from 'next/config';

import axios from 'axios';

import { MangaBase, MangaDetail, MangaWithPages } from '@interfaces/manga';
import { MangaParams, MangaResponse } from '@interfaces/services';

import generateQuery from '@utils/generateQuery';

const { publicRuntimeConfig } = getConfig();

const { DESU_ME_API, DESU_ME_API_WITH_CORS } = publicRuntimeConfig;

export const getMangaById = async (id: string): Promise<MangaDetail | null> => {
  try {
    // if id === 0 returns array with manga
    const { data } = await axios.get<MangaResponse<MangaDetail | MangaDetail[]>>(
      encodeURI(`${DESU_ME_API}${id}`),
    );

    if (data?.error || Array.isArray(data.response)) {
      return null;
    }

    return data.response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMangaChapterById = async (mangaId: string, chapterId: string): Promise<MangaWithPages | null> => {
  try {
    const { data } = await axios.get<MangaResponse<MangaWithPages>>(
      encodeURI(`${DESU_ME_API}${mangaId}/chapter/${chapterId}`),
    );

    if (data.error) {
      return null;
    }

    return data.response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMangas = async (
  params: MangaParams,
  cors?: boolean,
): Promise<MangaResponse<MangaBase[]> | null> => {
  try {
    const query = generateQuery(params);
    const currentAPI = cors ? DESU_ME_API_WITH_CORS : DESU_ME_API;

    const { data } = await axios.get<MangaResponse<MangaBase[]>>(
      encodeURI(`${currentAPI}?${query}`),
    );
    console.log('data', data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
