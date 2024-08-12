import pLimit from 'p-limit';
import axios from 'redaxios';

import { MangaBase, MangaDetail, MangaWithPages } from '@interfaces/manga/manga';
import { MangaResponse, MangaServiceParams } from '@interfaces/manga/service';

import generateQuery from '@utils/api/generateQuery';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN, HOST } } = getNextEnv();

const URL = `https://${MANGA_IMAGES_DOMAIN[1]}/manga/api`;

// Создайте экземпляр лимитера с максимальным количеством запросов в секунду
const limit = pLimit(3); // 3 запроса одновременно

// Имя вашего приложения или URL сайта для User-Agent
const userAgent = HOST;

export const getMangaById = async (id: string): Promise<MangaDetail | null> => {
  try {
    const data = await limit(() => axios.get<MangaResponse<MangaDetail | MangaDetail[]>>(
      encodeURI(`${URL}/${id}`),
      { headers: { 'User-Agent': userAgent } },
    ).then((response) => response.data));

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
    const data = await limit(() => axios.get<MangaResponse<MangaWithPages>>(
      encodeURI(`${URL}/${mangaId}/chapter/${chapterId}`),
      { headers: { 'User-Agent': userAgent } },
    ).then((response) => response.data));

    if (data.error) {
      return null;
    }

    return data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMangas = async (params: MangaServiceParams): Promise<MangaResponse<MangaBase[]> | null> => {
  try {
    const query = generateQuery(params);

    const data = await limit(() => axios.get<MangaResponse<MangaBase[]>>(
      encodeURI(`${URL}/?${query}`),
      { headers: { 'User-Agent': userAgent } },
    ).then((response) => response.data));

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
