/* eslint-disable max-len */

import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.status(405).send({
      message: 'Only GET requests allowed',
    });
    return;
  }

  const { url = '', referer = '' } = req.query;
  const currentUrl = url as string;
  const currentReferer = referer as string;

  const authorityMatch = currentUrl.match(/\/.+?\//g) || '';
  const authority = authorityMatch[0] && authorityMatch[0].split('/').join('');
  const contentTypeMatch = currentUrl.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/gi) || '';
  const contentType = contentTypeMatch[0] ? contentTypeMatch[0].split('.').join('') : 'jpg';

  try {
    const img = await fetch(currentUrl, {
      headers: {
        authority,
        accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'accept-language': 'ru,en;q=0.9',
        'cache-control': 'no-cache',
        pragma: 'no-cache',
        referer: currentReferer,
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "YaBrowser";v="24.1", "Yowser";v="2.5"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'image',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 YaBrowser/24.1.0.0 Safari/537.36',
      },
    });

    if (!img.ok) {
      res.status(404).send({
        message: 'Image not found',
      });
      return;
    }

    res.writeHead(200, {
      'Content-Type': `image/${contentType}`,
      'Cache-Control': 'public, immutable, no-transform, s-maxage=14400, max-age=14400',
    });

    res.end(Buffer.from(await img.arrayBuffer()));
  } catch (error) {
    res.status(400).send({
      message: 'Bad Request',
    });
  }
}
