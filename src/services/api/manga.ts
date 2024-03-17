import axios from 'redaxios';

import { MangaBase, MangaDetail, MangaWithPages } from '@interfaces/manga/manga';
import { MangaResponse, MangaServiceParams } from '@interfaces/manga/service';

import generateQuery from '@utils/api/generateQuery';
import getApiByNumber from '@utils/api/getApiByNumber';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGAS_API, MANGA_API_NUMBER } } = getNextEnv();

const MANGA_API_REWRITE_SOURCE = '/manga/api/';
const CURRENT_MANGA_API = getApiByNumber(MANGAS_API, Number(MANGA_API_NUMBER), MANGAS_API[0]);

export const getMangaById = async (id: string): Promise<MangaDetail | null> => {
  try {
    const { data } = await axios.get<MangaResponse<MangaDetail | MangaDetail[]>>(
      encodeURI(`${CURRENT_MANGA_API}${id}`),
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
): Promise<MangaWithPages | null> => {
  try {
    const { data } = await axios.get<MangaResponse<MangaWithPages>>(
      encodeURI(`${CURRENT_MANGA_API}${mangaId}/chapter/${chapterId}`),
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
  params: MangaServiceParams,
  cors?: boolean,
): Promise<MangaResponse<MangaBase[]> | null> => {
  try {
    const query = generateQuery(params);
    const currentAPI = cors ? MANGA_API_REWRITE_SOURCE : CURRENT_MANGA_API;

    const { data } = await axios.get<MangaResponse<MangaBase[]>>(
      encodeURI(`${currentAPI}?${query}`),
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
