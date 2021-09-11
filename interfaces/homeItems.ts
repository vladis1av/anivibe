export interface HomeItems {
  id: string | number;
  code: string;
  names: {
    en: string;
    ru: string;
    alternative: string;
  };
  poster: {
    updated_timestamp: number;
    url: string;
  };
}
