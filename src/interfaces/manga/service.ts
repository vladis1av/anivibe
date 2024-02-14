import { EMangaOrderBy, EMangaReleaseKind } from '@enums/enums';

export type EMangaOrderByValueType = `${EMangaOrderBy}`;
export type EMangaReleaseKindValueType = `${EMangaReleaseKind}`;

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
  order?: EMangaOrderByValueType;
  limit?: number;
  kinds?: EMangaReleaseKindValueType;
  genres?: string;
};
