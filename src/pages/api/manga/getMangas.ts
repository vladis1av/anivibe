/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';

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
  console.log('CURRENT_MANGA_API', CURRENT_MANGA_API);
  try {
    const query = generateQuery({
      page,
      limit,
      search,
      genres,
      kinds,
      order,
    });
    const HOST = MANGA_IMAGES_DOMAIN[0];
    const data = await fetch(`${CURRENT_MANGA_API}?${query}`, {
      method: 'GET',
      headers: { ...req.headers } as any,
    });
    console.error('HOST', HOST);
    console.error('CURRENT_MANGA_API', CURRENT_MANGA_API);

    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    console.error('catch CURRENT_MANGA_API', CURRENT_MANGA_API);
    res.status(500).json({ data: null });
  }
}
