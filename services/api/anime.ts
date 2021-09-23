import { ISearchItem } from './../../interfaces/searchItem';
import { IHomeItems } from './../../interfaces/homeItems';
import { IAnimeItem } from './../../interfaces/animeItem';
import { api } from '../apiCore';

const animeApi = {
  async getLastUdatedAnimeList(skipItems: number = 0, limit: number = 10) {
    const { data } = await api.get<IHomeItems[]>(
      `/getUpdates?filter=poster,id,code,names&limit=${limit}&after=${skipItems}`,
    );

    return data;
  },

  async getAnimeById(id: string | string[]) {
    const { data } = await api.get<IAnimeItem>(
      `/getTitle?code=${id}&playlist_type=array`,
    );
    return data;
  },

  async searchAnime(value: string) {
    const { data } = await api.get<ISearchItem[]>(
      `/searchTitles?filter=poster,id,code,names,type,genres&search=${value}`,
    );
    return data;
  },
};

export default animeApi;
