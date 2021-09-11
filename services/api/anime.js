import { api } from '../apiCore';

const animeApi = {
  async getLastUdatedAnimeList(after = 0) {
    const { data } = await api.get(
      `/getUpdates?filter=poster,id,code,names&limit=20&after=${after}`,
    );
    return data;
  },

  async getAnimeById(id) {
    const { data } = await api.get(`/getTitle?code=${id}&playlist_type=array`);
    return data;
  },

  async searchAnime(value) {
    const { data } = await api.get(`/searchTitles?search=${value}`);
    return data;
  },
};

export default animeApi;
