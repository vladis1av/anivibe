export type MangaPageQuery = {
  page?: string;
  order?: string;
  genres?: string;
};

export type MangaPageChapterQuery = {
  page: string;
  mangaId: string;
  chapterId: string;
};
