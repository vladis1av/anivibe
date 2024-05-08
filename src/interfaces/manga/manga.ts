import { EMangaReleaseType } from '@interfaces/common';

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
  x32: string;
  x48: string;
  x120: string;
  x225: string;
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
  kind: EMangaReleaseType,
  image: MangaImage;
  url: string;
  age_limit: string;
  reading: string;
  ongoing: number;
  anonse: number;
  adult: number;
  status: string;
  aired_on: number;
  score: number;
  score_users: number;
  views: number;
  description: string;
  checked: Date;
  updated: Date;
  genres: string;
  synonyms: string;
  thread_id: number;
  released_on: number;
  mangadex_id: string | null;
  shikimori_id: number | null;
  myanimelist_id: number | null;
  trans_status: string;
  chapters?: {
    first: MangaChapter;
    last: MangaChapter;
    updated: MangaChapter;
  }
};

export type MangaChapters = {
  count: number;
  last: MangaChapter;
  first: MangaChapter;
  updated: MangaChapter;
  list: MangaChapterList[];
};

export type MangaDetail = Omit<MangaBase, 'genres' | 'chapters'> & {
  genres: MangaGenres[];
  chapters?: MangaChapters;
  translators: MangaTranslators[];
};

export type MangaWithPages = Omit<MangaDetail, 'chapters' | 'count'> & {
  pages: MangaPage;
  chapters: MangaChapters;
};
