import { NextRequest, NextResponse } from 'next/server';

import { getFilteredData } from '@services/api/anime';

export const config = {
  runtime: 'experimental-edge',
};

export default async function searchTitles(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const year = searchParams.get('year') || undefined;
    const genres = searchParams.get('genres') || undefined;
    const seasons = searchParams.get('season_code') || undefined;
    const voice = searchParams.get('voice') || undefined;
    const after = searchParams.get('after') || undefined;
    const limit = searchParams.get('limit') || undefined;

    const animes = await getFilteredData({
      method: 'searchTitles',
      filters: [
        'id',
        'code',
        'names',
      ],
      params: {
        limit: limit && limit.length ? Number(limit) : undefined,
        year,
        genres,
        season_code: seasons,
        voice,
        after,
      },
    }) || [];

    return NextResponse.json(animes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
