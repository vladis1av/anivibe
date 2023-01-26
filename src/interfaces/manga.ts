import { EMangaReliaseType } from '@interfaces/common';

export type PageParams = {
  count: number;
  page: number;
  limit: number;
  order_by: string,
};

export type MangaChapter = {
  vol: number;
  ch: number;
  name: null | string;
  date: number;
};

export type MangaChapterList = Omit<MangaChapter, 'name'> & {
  id: number;
  title: null | string;
  check: number;
};

export type MangaImage = {
  original: string;
  preview: string;
  x120: string;
};

export type MangaGenres = {
  id: number;
  kind: string;
  text: string;
  russian: string;
};

export type MangaTranslators = {
  id: number;
  name: string;
  site: null | string;
};

export type MangaPageSource = {
  id: number;
  page: number;
  width: number;
  height: number;
  img: string;
};

export type MangaPage = {
  ch_curr: MangaChapterList;
  ch_prev: MangaChapterList | number;
  ch_next: MangaChapterList | number;
  list: MangaPageSource[];
};

export type MangaBase = {
  id: number;
  name: string;
  russian: string;
  kind: EMangaReliaseType,
  image: MangaImage;
  url: string;
  reading: string;
  ongoing: number;
  anonse: number;
  adult: number;
  status: string;
  aired_on: Date;
  score: number;
  score_users: number;
  views: number;
  description: string;
  checked: Date;
  updated: Date;
  genres: string;
  synonyms: string;
  thread_id: number;
  shikimori_id: number | null;
  myanimelist_id: number | null;
  chapters: {
    first: MangaChapter;
    last: MangaChapter;
    updated: MangaChapter;
  }
};

export type MangaDetail = Omit<MangaBase, 'genres' | 'chapters'> & {
  genres: MangaGenres[];
  translators: MangaTranslators[];
  chapters: {
    count: number;
    list: MangaChapterList[];
    first: MangaChapter;
    last: MangaChapter;
    updated: MangaChapter;
  }
};

export type MangaWithPages = Omit<MangaDetail, 'chapters' | 'count'> & {
  chapters: {
    first: MangaChapter;
    last: MangaChapter;
    updated: MangaChapter;
    count: number;
    list: MangaChapterList[];
  };
  pages: MangaPage;
};
