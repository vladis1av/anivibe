export enum ETheme {
  dark = 'dark',
  light = 'light',
}

export enum ECollection {
  anime = 'anime',
  manga = 'manga',
}

export enum EScrollSide {
  left = 'left',
  right = 'right',
}

export enum EFyle {
  jpg = 'jpg',
  webp = 'webp',
  torrent = 'torrent',
  magnet = 'magnet:?xt=urn:btih:',
}

export enum EIcon {
  home = 'home',
}

export enum ERouteName {
  home = 'home',
  animes = 'animes',
  mangas = 'mangas',
  chapter = 'chapter',
}

export enum EHlsQuality {
  sd = '480',
  hd = '720',
  fhd = '1080',
}

export enum EFilter {
  genres = 'Жанр',
  years = 'Год',
  seasons = 'Сезон',
}

export enum ELinkPath {
  home = '/',
  animes = '/animes',
  mangas = '/mangas',
  chapter = '/chapter',
}

export enum ELoad {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export enum EAnimeReliase {
  tv = 'TV',
  movie = 'Фильм',
  ova = 'OVA',
  ona = 'ONA',
}

export enum EMangaReliase {
  manga = 'Манга',
  manhwa = 'Манхва',
  manhua = 'Маньхуа',
}

export const EReliase = {
  ...EAnimeReliase,
  ...EMangaReliase,
};

export enum EMediaInfo {
  reliaseType = 'Тип',
  episodes = 'Эпизоды',
  duration = 'Длительность эпизода',
  volumes = 'Тома',
  chapters = 'Главы',
  years = 'Год',
  seasons = 'Сезон',
  voices = 'Озвучка',
  genres = 'Жанры',
  description = 'Описание',
}

export enum EColor {
  white = '#FFFFFF',
  veryPale = '#FFFFFF',
  black = '#0f0f0f',
  gray = '#7f7f7f',
  vividCyan = '#03dac5',
  halfTransparentBlack = 'rgba(0, 0, 0, 0.5)',
  halfTransparentWhite = 'rgba(255, 255, 255, 0.5)',
  transparent = 'transparent',
  blue = '#1976d2d9',
  lightGray = 'rgb(158, 158, 158)',
}
