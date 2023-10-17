import axios from 'redaxios';

import { ERuntimeValueType } from '@interfaces/common';
import { MangaBase, MangaDetail, MangaWithPages } from '@interfaces/manga';
import { MangaParams, MangaResponse } from '@interfaces/services';

import generateQuery from '@utils/api/generateQuery';
import getApiByNumber from '@utils/api/getApiByNumber';
import isEdgeRuntime from '@utils/api/isEdgeRuntime';
import serverlessOrEdgeApi from '@utils/api/serverlessOrEdgeApi';
import getProcessEnv from '@utils/config/getProcessEnv';

// edge functions not support next.config.js {publicRuntimeConfig || serverRuntimeConfig} getConfig
const { MANGAS_API, MANGA_API_NUMBER, EDGE_FUNCTIONS_MANGA_API } = getProcessEnv();

const MANGA_API_REWRITE_SOURCE = '/manga/api/';
const mangaApi = getApiByNumber(MANGAS_API, Number(MANGA_API_NUMBER), MANGAS_API[0]);

export const getMangaById = async (id: string, runtime?: ERuntimeValueType): Promise<MangaDetail | null> => {
  try {
    if (isEdgeRuntime(runtime)) {
      const { data } = await axios.get<MangaDetail | null>(
        encodeURI(`${EDGE_FUNCTIONS_MANGA_API}getMangaById?id=${id}`),
      );

      return data;
    }

    const { data } = await axios.get<MangaResponse<MangaDetail | MangaDetail[]>>(
      encodeURI(`${mangaApi}${id}`),
    );

    // if id === 0 returns array with manga
    if (data?.error || Array.isArray(data.response)) {
      return null;
    }

    return data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMangaChapterById = async (
  mangaId: string,
  chapterId: string,
  runtime?: ERuntimeValueType,
): Promise<MangaWithPages | null> => {
  try {
    if (isEdgeRuntime(runtime)) {
      const { data } = await axios.get<MangaWithPages | null>(
        encodeURI(`${EDGE_FUNCTIONS_MANGA_API}getMangaChapterById?id=${mangaId}&chapter=${chapterId}`),
      );
      return data;
    }

    const { data } = await axios.get<MangaResponse<MangaWithPages>>(
      encodeURI(`${mangaApi}${mangaId}/chapter/${chapterId}`),
    );

    if (data.error) {
      return null;
    }

    return data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMangas = async (
  params: MangaParams,
  cors?: boolean,
  runtime?: ERuntimeValueType,
): Promise<MangaResponse<MangaBase[]> | null> => {
  try {
    const currentMangaApi = serverlessOrEdgeApi(`${EDGE_FUNCTIONS_MANGA_API}/getMangas`, mangaApi, runtime);
    const query = generateQuery(params);
    const currentAPI = cors ? MANGA_API_REWRITE_SOURCE : currentMangaApi;

    const { data } = await axios.get<MangaResponse<MangaBase[]>>(
      encodeURI(`${currentAPI}?${query}`),
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
