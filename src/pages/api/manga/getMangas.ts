import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'redaxios';

import generateQuery from '@utils/api/generateQuery';
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
    page = '1',
    limit = '18',
    search,
    genres,
    kinds,
    order,
  } = req.query;

  try {
    const query = generateQuery({
      page,
      limit,
      search,
      genres,
      kinds,
      order,
    });

    const { data } = await axios.get(
      encodeURI(`${CURRENT_MANGA_API}?${query}`),
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
