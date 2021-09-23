export interface IHomeItems {
  id: number;
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
