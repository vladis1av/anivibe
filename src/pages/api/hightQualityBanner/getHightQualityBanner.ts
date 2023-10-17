import { NextRequest, NextResponse } from 'next/server';

import { ECollectionType } from '@interfaces/collection';

import { ECollection } from '@enums/enums';

import { getHightQualityBanner } from '@services/api/common';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getBanner(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id') || '';
    let titleType = searchParams.get('type');

    if (titleType !== ECollection.anime && titleType !== ECollection.manga) {
      titleType = ECollection.anime;
    }

    const banner = await getHightQualityBanner(id, titleType as ECollectionType);

    if (!banner) {
      return NextResponse.json(banner, { status: 404 });
    }

    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
