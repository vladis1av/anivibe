import { TorrentsProps } from './torrents';
import { HomeItems } from './homeItems';

export interface AnimeItem extends HomeItems {
  description: string;
  genres: [string];
  type: {
    full_string: string;
  };
  torrents: TorrentsProps;
  player: {
    alternative_player: string;
    host: string;
  };
  season: {
    string: string;
    year: number;
  };
  team: {
    voice: [string];
  };
}
