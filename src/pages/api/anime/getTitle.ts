import { NextRequest, NextResponse } from 'next/server';

import { getAnimeByCode } from '@services/api/anime';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getTitle(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const code = searchParams.get('code') || '';

    const anime = await getAnimeByCode(code);

    if (!anime) {
      return NextResponse.json(anime, { status: 404 });
    }

    return NextResponse.json(anime, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
