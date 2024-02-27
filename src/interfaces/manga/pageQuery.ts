import { EMangaOrderByValueType, EMangaReleaseKindValueType } from './service';

export type MangaPageQuery = {
  page?: string;
  genres?: string;
  order?: EMangaOrderByValueType;
  pageType?: EMangaReleaseKindValueType;
  kinds?: EMangaReleaseKindValueType;
};

export type MangaPageChapterQuery = {
  page: string;
  mangaId: string;
  chapterId: string;
};
