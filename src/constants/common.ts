import { MainRouteType } from '@interfaces/common';

import { ECollection } from '@enums/enums';

export const APP_LOGO: string = '(っ^‿^)っ';
export const DEFAULT_YEAR_FOR_QUERY: string = '2022';
export const IS_DEV = process.env.NODE_ENV === 'development';
export const THEME_FROM_LOCAL_STORAGE: string = 'anime-APP-theme';
export const PLACEHOLDER_POSTER: string = '/static/poster-placeholder.png';
export const PLACEHOLDER_BANNER: string = '/static/banner-placeholder.png';
export const SEARCH_ANIME_PLACEHOLDER: string = 'Поиск аниме...';
export const SEARCH_MANGA_PLACEHOLDER: string = 'Поиск манги...';
export const SELECT_SEARCH_TYPES = [
  { name: 'Аниме', type: ECollection.anime },
  { name: 'Манга', type: ECollection.manga },
];
export const MAIN_ROUTES_MENU: MainRouteType = {
  home: { title: 'Главная' },
  animes: { title: 'Аниме' },
  mangas: { title: 'Манга' },
};
