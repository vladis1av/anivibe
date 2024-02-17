import { AnimeServiceParams } from '@interfaces/anime/service';
import { MangaServiceParams } from '@interfaces/manga/service';

const isAnimeServiceParamsTypeGuard = (
  params: AnimeServiceParams | MangaServiceParams,
): params is AnimeServiceParams => 'items_per_page' in params;

export default isAnimeServiceParamsTypeGuard;
