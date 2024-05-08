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
  manhwa = 'manhwa',
  manhua = 'manhua',
  comics = 'comics',
  one_shot = 'one_shot',
}

export enum EScrollSide {
  left = 'left',
  right = 'right',
}

export enum ELocale {
  ru = 'ru',
  us = 'en-US',
}

export enum ENotification {
  cookie = 'cookie',
  adblock = 'adblock',
  storage = 'storage',
  networkOnline = 'networkOnline',
  networkOffline = 'networkOffline',
}

export enum ENotificationKey {
  app = 'app',
}

export enum EPlaceholder {
  poster = 'poster',
  banner = 'banner',
  error = 'error',
}

export enum EVideoPlayerMenu {
  default = 'default',
  playbackRate = 'playbackRate',
  quality = 'quality',
  ambientMode = 'ambientMode',
}

export enum EFilter {
  genres = 'Жанр',
  years = 'Год',
  seasons = 'Сезон',
  voices = 'Озвучка',
  order = 'Упорядочить',
  kinds = 'Тип',
}

export enum EMangaRelease {
  manga = 'Манга',
  manhwa = 'Манхва',
  manhua = 'Маньхуа',
  one_shot = 'Ваншот',
  comics = 'Комикс',
}

export enum EMangaReleaseKind {
  manga = 'manga',
  manhwa = 'manhwa',
  manhua = 'manhua',
  one_shot = 'one_shot',
  comics = 'comics',
}

export enum EAnimeRelease {
  anime = 'Аниме',
  special = 'Спешл',
  tv = 'TV Сериал',
  movie = 'Фильм',
  ova = 'OVA',
  ona = 'ONA',
  web = 'WEB',
}

export enum EFile {
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

export enum EFilterLoading {
  pending = 'pending',
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

export enum ESkeleton {
  waveAuto = 'waveAuto',
  waveLight = 'waveLight',
  waveDark = 'waveDark',
  pulseAuto = 'pulseAuto',
  pulseDark = 'pulseDark',
  pulseLight = 'pulseLight',
}

export enum EMediaInfo {
  releaseType = 'Тип',
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
  defaultBlack = '#000',
  black = '#0f0f0f',
  blue = '#1976d2d9',
  red = '#C3122F',
  green = '#4AE88C',
  yellow = '#FFD358',
  vividCyan = '#03dac5',
  lightBlue = '#70c1ff',
  transparent = 'transparent',
  lightGray = 'rgb(158, 158, 158)',
  halfTransparentLightGray = 'rgba(120, 120, 120, 50%)',
  darkTransparent = 'rgba(17, 17, 17, 0.8)',
  halfTransparentBlack = 'rgba(0, 0, 0, 0.5)',
  lightTransparent = 'rgba(255, 255, 255, 0.08)',
  halfTransparentWhite = 'rgba(255, 255, 255, 0.5)',
  almostTransparentWhite = 'rgba(255, 255, 255, 0.2)',
}

export const ERelease = {
  ...EAnimeRelease,
  ...EMangaRelease,
};

export enum EAnimeMethod {
  getUpdatedTitles = 'title/updates',
  getChangedTitles = 'title/changes',
  searchTitles = 'title/search',
}

export enum EMangaOrderBy {
  name = 'name',
  popular = 'popular',
  updated = 'updated',
}

export enum EReadingMode {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum EPageSwitchingArea {
  page = 'page',
  image = 'image',
}

export enum EPosition {
  topRight = 'topRight',
  topCenter = 'topCenter',
  topLeft = 'topLeft',
  bottomLeft = 'bottomLeft',
  bottomCenter = 'bottomCenter',
  bottomRight = 'bottomRight',
}
