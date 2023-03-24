export enum EButtonPlay {
  big = 'big',
}

export enum EIcon {
  home = 'home',
}

export enum EButtonSide {
  prev = 'prev',
  next = 'next',
}

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

export enum EVideoPlayerMenu {
  default = 'default',
  playbackRate = 'playbackRate',
  quality = 'quality',
}

export enum EFilter {
  genres = 'Жанр',
  years = 'Год',
  seasons = 'Сезон',
}
export enum EMangaReliase {
  manga = 'Манга',
  manhwa = 'Манхва',
  manhua = 'Маньхуа',
}

export enum EAnimeReliase {
  tv = 'TV',
  movie = 'Фильм',
  ova = 'OVA',
  ona = 'ONA',
}

export enum EFyle {
  jpg = 'jpg',
  webp = 'webp',
  torrent = 'torrent',
  magnet = 'magnet:?xt=urn:btih:',
}

export enum ERouteName {
  home = 'home',
  animes = 'animes',
  mangas = 'mangas',
  chapter = 'chapter',
}

export enum ELinkPath {
  home = '/',
  animes = '/animes',
  mangas = '/mangas',
  chapter = '/chapter',
}

export enum ELoadingStatus {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export enum EVideoPlayerStatus {
  idle = 'idle',
  pause = 'pause',
  playing = 'playing',
  loading = 'loading',
  error = 'error',
}

export enum EHlsQuality {
  '4k' = '2160',
  qhd = '1440',
  fhd = '1080',
  hd = '720',
  sd = '480',
}

export enum EHlsQualityKey {
  '4k' = '4k',
  qhd = 'qhd',
  fhd = 'fhd',
  hd = 'hd',
  sd = 'sd',
}

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
  gray = '#7f7f7f',
  white = '#ffffff',
  black = '#0f0f0f',
  blue = '#1976d2d9',
  vividCyan = '#03dac5',
  lightBlue = '#70c1ff',
  transparent = 'transparent',
  lightGray = 'rgb(158, 158, 158)',
  darkTransparent = 'rgba(17, 17, 17, 0.8)',
  halfTransparentBlack = 'rgba(0, 0, 0, 0.5)',
  lightTransparent = 'rgba(255, 255, 255, 0.08)',
  halfTransparentWhite = 'rgba(255, 255, 255, 0.5)',
  almostTransparentWhite = 'rgba(255, 255, 255, 0.2)',
}

export const EReliase = {
  ...EAnimeReliase,
  ...EMangaReliase,
};
