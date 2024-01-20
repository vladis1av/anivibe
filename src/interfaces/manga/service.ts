export type MangaPageNavParams = {
  count: number;
  page: number;
  order_by: string;
};

export type MangaResponse<T> = {
  error?: string;
  pageNavParams?: MangaPageNavParams;
  response: T;
};

export type MangaServiceParams = {
  search?: string;
  page?: number;
  order?: string;
  limit?: number;
  kinds?: string;
  genres?: string;
};
