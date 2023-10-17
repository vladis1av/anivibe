import { NextRequest, NextResponse } from 'next/server';

import { getFilteredData } from '@services/api/anime';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getUpdates(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const limit = searchParams.get('limit') || undefined;

    const animes = await getFilteredData({
      method: 'getUpdates',
      filters: ['id', 'code', 'names'],
      params: { limit: limit && limit.length ? Number(limit) : undefined },
    }) || [];

    return NextResponse.json(animes, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
