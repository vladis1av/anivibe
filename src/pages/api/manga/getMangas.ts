import { NextRequest, NextResponse } from 'next/server';

import { getMangas } from '@services/api/manga';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getMangaTitles(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = searchParams.get('page');
    const search = searchParams.get('search') || undefined;
    const limit = searchParams.get('limit');
    const genres = searchParams.get('genres') || undefined;
    const order = searchParams.get('order') || undefined;
    const params = {
      page: page && page.length ? Number(page) : undefined,
      search,
      limit: limit && limit.length ? Number(limit) : undefined,
      genres,
      order,
    };
    const mangas = await getMangas(params);

    if (!mangas) {
      return NextResponse.json(mangas, { status: 404 });
    }

    return NextResponse.json(mangas, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
