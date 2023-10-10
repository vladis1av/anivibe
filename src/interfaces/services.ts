import { Anime, AnimeKeys } from './anime';

export type IsEdgeFunctions = {
  isEdgeFunctions?: boolean;
};

export type FilteredProps<T> = IsEdgeFunctions & {
  filters?: T[],
  method: 'getUpdates' | 'searchTitles',
  params?: Params,
};

export type Params = {
  filter?: AnimeKeys[];
  season_code?: string;
  year?: string;
  limit?: number;
  page?: number;
  genres?: string;
  search?: string;
  voice?: string;
  after?: string;
  order?: string;
  translator?: string;
};

export type SearchAnimeType = Pick<Anime, 'id' | 'code' | 'genres' | 'names' | 'type' | 'season'>;

export type FetchedLastAnimeUpdatedResult = Pick<Anime, 'id' | 'code' | 'names'>;

export type PageNavParams = {
  count: number;
  page: number;
  order_by: string;
};

export type MangaResponse <T> = {
  error?: string;
  pageNavParams?: PageNavParams;
  response: T;
};

export type MangaParams = Pick<Params, 'page' | 'search' | 'limit' | 'genres' | 'order'>;
