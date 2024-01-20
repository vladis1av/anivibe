export type MangaPageQuery = {
  page?: string;
  order?: string;
  genres?: string;
  kinds?: string;
};

export type MangaPageChapterQuery = {
  page: string;
  mangaId: string;
  chapterId: string;
};
