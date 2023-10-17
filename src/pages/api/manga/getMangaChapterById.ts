import { NextRequest, NextResponse } from 'next/server';

import { getMangaChapterById } from '@services/api/manga';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getMangaTitleChapterById(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const mangaId = searchParams.get('id') || '';
    const mangaChapterId = searchParams.get('chapter') || '';

    const mangaChapter = await getMangaChapterById(mangaId, mangaChapterId);

    if (!mangaChapter) {
      return NextResponse.json(mangaChapter, { status: 404 });
    }

    return NextResponse.json(mangaChapter, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
