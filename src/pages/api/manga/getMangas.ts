/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';

import generateQuery from '@utils/api/generateQuery';

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
    const data = await fetch(`https://desu.win/manga/api?${query}`, {
      method: 'GET',
      headers: { ...req.headers } as any,
    });

    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null });
  }
}
