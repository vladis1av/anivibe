import { NextRequest, NextResponse } from 'next/server';

import { getMangaById } from '@services/api/manga';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getMangaTitleById(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id') || '';
    const manga = await getMangaById(id);

    if (!manga) {
      return NextResponse.json(manga, { status: 404 });
    }

    return NextResponse.json(manga, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
