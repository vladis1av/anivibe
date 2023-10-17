import { NextResponse } from 'next/server';

import { getYears } from '@services/api/anime';

export const config = {
  runtime: 'experimental-edge',
};

export default async function getAnimeYears() {
  try {
    const years = await getYears();

    return NextResponse.json(years, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json([], { status: 500 });
  }
}
