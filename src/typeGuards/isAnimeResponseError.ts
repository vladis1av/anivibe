import { AnimeResponse, AnimeResponseError } from '@interfaces/anime/service';

const isAnimeResponseError = (item: AnimeResponse): item is AnimeResponseError => 'error' in item;

export default isAnimeResponseError;
