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
    id,
  } = req.query;

  try {
    const { data } = await axios.get(
      encodeURI(`${CURRENT_MANGA_API}${id}`),
      {
        headers: {
          referer: MANGA_IMAGES_DOMAIN[0],
        },
      },
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null });
  }
}
