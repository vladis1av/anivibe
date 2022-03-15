// import {
//   ISearchItem,
//   IHomeItems,
//   IAnimeItem,
// } from '@interfaces/interfaces';
// add type for services
import { api } from '../apiCore';

const animeApi = {
  async getLastUdatedAnimeList(skipItems: number = 0, limit: number = 10) {
    const { data } = await api.get(
      `/getUpdates?filter=posters,id,code,names&limit=${limit}&after=${skipItems}`,
    );

    return data;
  },

  async getAnimeById(id: string | string[]) {
    const { data } = await api.get(
      `/getTitle?code=${id}&playlist_type=array`,
    );
    return data;
  },

  async searchAnime(value: string) {
    const { data } = await api.get(
      `/searchTitles?filter=poster,id,code,names,type,genres&search=${value}`,
    );
    return data;
  },
};

export default animeApi;
