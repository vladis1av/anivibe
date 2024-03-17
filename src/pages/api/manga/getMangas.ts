/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';

import generateQuery from '@utils/api/generateQuery';
import getApiByNumber from '@utils/api/getApiByNumber';

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
  const MANGAS_API = process.env.MANGAS_API ? process.env.MANGAS_API.split(',') : [];
  const MANGA_API_NUMBER = process.env.MANGA_API_NUMBER || '0';

  const CURRENT_MANGA_API = getApiByNumber(MANGAS_API, Number(MANGA_API_NUMBER), MANGAS_API[0]);
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
    const data = await fetch(`${CURRENT_MANGA_API}?${query}`, {
      method: 'GET',
      headers: { ...req.headers } as any,
    });
    console.error('process.env.', process.env);
    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    console.error('catch process.env.', process.env);

    res.status(500).json({ data: null });
  }
}
