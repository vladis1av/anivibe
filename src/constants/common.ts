import { EVideoPlayerMenuType, MainRouteType, SelectType } from '@interfaces/common';
import { SvgIconProps } from '@interfaces/svg';

import { ECollection, EVideoPlayerMenu } from '@enums/enums';

export const HOUR: number = 3600;
export const MINUTE: number = 60;
export const SKIP_OST_TITLE: string = 'Пропустить';
export const NEXT_EPIDSODE_TITLE: string = 'Следующая серия';
export const SECONDS_FOR_SHOW_BUTTONS: number = 20;
export const API_ITEMS_LIMIT: number = 18;
export const CHAPTER_TITLE: string = 'Список Глав';
export const APP_LOGO: string = '(っ^‿^)っ';
export const LOAD_MORE: string = 'Загрузить еще';
export const COLLECTION_ITEMS_LIMIT: number = 10;
export const DEFAULT_YEAR_FOR_QUERY: string = '2022';
export const NOT_FOUND_TITLES: string = 'Ничего не найдено';
export const LOADED_ALL_TITLES: string = 'Вы все просмотрели';
export const IS_SERVER: boolean = typeof window === 'undefined';
export const SEARCH_ANIME_PLACEHOLDER: string = 'Поиск аниме...';
export const SEARCH_MANGA_PLACEHOLDER: string = 'Поиск манги...';
export const THEME_FROM_LOCAL_STORAGE: string = 'anime-APP-theme';
export const IS_DEV: boolean = process.env.NODE_ENV === 'development';
export const POSTER_NOT_FOUND: string = '/images/poster-not-found.png';
export const PLACEHOLDER_POSTER: string = '/images/poster-placeholder.png';
export const PLACEHOLDER_BANNER: string = '/images/banner-placeholder.png';
export const PLACEHOLDER_POSTER_BLACK: string = '/images/poster-placeholder-black.png';
export const VIDEO_PLAYER_SVG_SIZE: SvgIconProps = { width: 20, height: 20 };
export const PLAYBACK_SPEED: Array<number> = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
export const USER_ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'touchstart'];
export const CIRCLES = [{ begin: 0.2, cx: 0 }, { begin: 0.3, cx: 50 }, { begin: 0.4, cx: 100 }];
export const SETTINGS_MENU_ITEM_TITLE = {
  [EVideoPlayerMenu.quality]: 'Качество',
  [EVideoPlayerMenu.ambientMode]: 'Освещение',
  [EVideoPlayerMenu.playbackRate]: 'Скорость',
  [EVideoPlayerMenu.default]: undefined,
};
export const SETTINGS_MENU_ITEMS: Array<EVideoPlayerMenuType> = [
  EVideoPlayerMenu.default,
  EVideoPlayerMenu.ambientMode,
  EVideoPlayerMenu.quality,
  EVideoPlayerMenu.playbackRate,
];
export const SELECT_SEARCH_TYPES: Array<SelectType> = [
  { name: 'Аниме', type: ECollection.anime },
  { name: 'Манга', type: ECollection.manga },
];
export const MAIN_ROUTES_MENU: MainRouteType = {
  home: { title: 'Главная' },
  animes: { title: 'Аниме' },
  mangas: { title: 'Манга' },
};
