import { EMangaOrderByValueType, EMangaReleaseKindValueType } from './service';

export type MangaPageQuery = {
  page?: string;
  genres?: string;
  order?: EMangaOrderByValueType;
  kinds?: EMangaReleaseKindValueType;
};

export type MangaPageChapterQuery = {
  page: string;
  mangaId: string;
  chapterId: string;
};
