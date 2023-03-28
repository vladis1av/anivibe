import getConfig from 'next/config';

import axios from 'axios';

import { MangaBase, MangaDetail, MangaWithPages } from '@interfaces/manga';
import { MangaParams, MangaResponse } from '@interfaces/services';

import generateQuery from '@utils/generateQuery';

const { publicRuntimeConfig } = getConfig();

const { DESU_ME_API } = publicRuntimeConfig;

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
): Promise<MangaResponse<MangaBase[]> | null> => {
  try {
    const query = generateQuery(params);
    const { data } = await axios.get<MangaResponse<MangaBase[]>>(
      encodeURI(`${DESU_ME_API}?${query}`),
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
