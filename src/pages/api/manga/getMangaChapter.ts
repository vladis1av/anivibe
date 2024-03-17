/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'redaxios';

import getApiByNumber from '@utils/api/getApiByNumber';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGAS_API, MANGA_API_NUMBER, MANGA_IMAGES_DOMAIN } } = getNextEnv();

const CURRENT_MANGA_API = getApiByNumber(MANGAS_API, Number(MANGA_API_NUMBER), MANGAS_API[0]);

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> {
  if (req.method !== 'GET') {
    res.status(405).send({
      message: 'Only GET requests allowed',
    });
    return;
  }

  const {
    mangaId,
    chapterId,
  } = req.query;

  try {
    const { data } = await axios.get(
      encodeURI(`${CURRENT_MANGA_API}${mangaId}/chapter/${chapterId}`),
      {
        headers: {
          authority: MANGA_IMAGES_DOMAIN[0],
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-language': 'ru,en;q=0.9',
          'cache-control': 'max-age=0',
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "YaBrowser";v="24.1", "Yowser";v="2.5"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
        },
      },
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null });
  }
}
