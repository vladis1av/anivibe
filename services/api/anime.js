import axios from 'axios';
import { api } from '../apiCore';

const animeApi = {
  async getLastUdatedAnimeList(skipItems = 0, limit = 10) {
    const { data } = await api.get(
      `/getUpdates?filter=poster,id,code,names&limit=${limit}&after=${skipItems}`,
    );

    return data;
  },

  async getAnimeById(id) {
    const { data } = await api.get(`/getTitle?code=${id}&playlist_type=array`);
    return data;
  },
  async getAnimeMoreInfo(title) {
    const { data } = await axios.get(
      `https://api.aniapi.com/v1/anime?title=${title}`,
      {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5MSIsIm5iZiI6MTYzMTE4NDY2NiwiZXhwIjoxNjMzNzc2NjY2LCJpYXQiOjE2MzExODQ2NjZ9.Envz_D4Zw1rXaJFS7jy0AtuXn89XYnb_J2m_rUc6Avk',
        },
      },
    );

    return data;
  },

  async searchAnime(value) {
    const { data } = await api.get(`/searchTitles?search=${value}`);
    return data;
  },
};

export default animeApi;
