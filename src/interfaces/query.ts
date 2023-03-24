export type QueryType<T> = { query: T };

export type AnimeQuery = {
  years?: string;
  genres?: string;
  seasons?: string;
  after?: string;
  voices?: string;
};

export type MangaQuery = {
  page: string;
} & Pick<AnimeQuery, 'genres'>;

export type MangaChapterQuery = {
  page: string;
  mangaId: string;
  chapterId: string;
};

export type VideoPlayerEpisodeQuery = {
  episode: string;
};
