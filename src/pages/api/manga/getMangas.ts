/* eslint-disable max-len */
import type { NextApiRequest, NextApiResponse } from 'next';

import generateQuery from '@utils/api/generateQuery';
import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN } } = getNextEnv();

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
    const HOST = MANGA_IMAGES_DOMAIN[0];
    const data = await fetch(`https://desu.me/manga/api?${query}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'https://anivibe.vercel.app/',
        authority: HOST,
        referer: `https:/${HOST}/`,
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
    });
    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null });
  }
}
