export type AnimeQuery = {
  years?: string;
  genres?: string;
  seasons?: string;
  after?: string;
  voices?: string;
};

export type MangaQuery = Pick<AnimeQuery, 'genres'>;
