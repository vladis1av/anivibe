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
    const data = await fetch(`https://desu.me/manga/api/${mangaId}/chapter/${chapterId}`, {
      method: 'GET',
      headers: req.headers as any,
    });

    const result = await data.json();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null });
  }
}
