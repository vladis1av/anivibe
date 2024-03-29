import { EAnimeRelease } from '@enums/enums';

import { HlsQuality } from '../hls';

export type EAnimeReleaseKeyType = keyof typeof EAnimeRelease;

export type BannerImage = {
  bannerImageHightQuality: string | null;
};

type Poster = {
  url: string;
  raw_base64_file: string | null;
};

type Episodes = {
  first: number;
  last: number;
  string: string;
};

type TorrentQuality = {
  string: string;
  type: string;
  resolution: number;
  encode: string;
  lq_audio: boolean;
};

type Type = {
  full_string: string;
  code: number;
  string: EAnimeReleaseKeyType;
  series: number;
  length: number;
};

type Status = {
  string: string;
  code: number;
};

export type TimeSkipsType = [number, number] | [];

export type Playlist = {
  episode: number;
  name: string | null;
  create_timestamp: number;
  hls: HlsQuality;
  preview: string;
  skips: {
    ending: TimeSkipsType;
    opening: TimeSkipsType;
  };
  uuid: string;
};

export type Player = {
  alternative_player: string | null;
  episodes: Episodes;
  is_rutube: boolean;
  host: string;
  list: Array<Playlist>;
  rutube: Array<Playlist>;
};

export type Anime = {
  id: number;
  code: string;
  announce: string;
  status: Status;
  series: Episodes;
  type: Type;
  torrents: Torrent;
  description: string;
  genres: Array<string>;
  banner_image?: string;
  names: {
    en: string;
    ru: string;
    alternative: string | null;
  };
  posters: {
    small: Poster;
    medium: Poster;
    original: Poster;
  };
  player: Player;
  team: {
    voice: Array<string>;
    translator: Array<string>;
    editing: Array<string>;
    decor: Array<string>;
    timing: Array<string>;
  };
  season: {
    string: string;
    code: number;
    year: number;
    week_day: number;
  };
  in_favorites: number;
  blocked: {
    blocked: boolean;
    bakanim: boolean;
  }
  update: number;
  last_change: number;
};

export type TorrentListItems = {
  episodes: Episodes;
  torrent_id: number;
  leechers: number;
  hash: string;
  seeders: number;
  downloads: number;
  total_size: number;
  quality: TorrentQuality;
  url: string;
  uploaded_timestamp: number;
  metadata: string | null;
  raw_base64_file: string | null;
};

export type TorrentList = {
  list: TorrentListItems[];
};

export type Torrent = TorrentList & {
  episodes: Episodes;
};

export type AnimeInfoTypes = {
  [id: string]: string;
};

export type AnimeKeys = keyof Anime;
