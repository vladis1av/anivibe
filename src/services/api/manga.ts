import axios from 'redaxios';

import { MangaBase, MangaDetail, MangaWithPages } from '@interfaces/manga/manga';
import { MangaResponse, MangaServiceParams } from '@interfaces/manga/service';

import generateQuery from '@utils/api/generateQuery';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { API } } = getNextEnv();

export const getMangaById = async (id: string): Promise<MangaDetail | null> => {
  try {
    const { data } = await axios.get<MangaResponse<MangaDetail | MangaDetail[]>>(
      encodeURI(`${API}/manga/${id}`),
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
      encodeURI(`${API}/manga/${mangaId}/chapter/${chapterId}`),
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

export const getMangas = async (params: MangaServiceParams): Promise<MangaResponse<MangaBase[]> | null> => {
  try {
    const query = generateQuery(params);

    const { data } = await axios.get<MangaResponse<MangaBase[]>>(
      encodeURI(`${API}/manga?${query}`),
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
