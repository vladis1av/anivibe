import { ITorrents } from './torrents';
import { IHomeItems } from './homeItems';

export interface IAnimeItem extends IHomeItems {
  description: string;
  genres: string[];
  type: {
    full_string: string;
  };
  banner_image?: string;
  torrents: ITorrents;
  player: {
    alternative_player: string;
    host: string;
  };
  season: {
    string: string;
    year: number;
  };
  team: {
    voice: string[];
  };
}
