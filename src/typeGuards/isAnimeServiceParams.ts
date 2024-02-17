import { AnimeServiceParams } from '@interfaces/anime/service';
import { MangaServiceParams } from '@interfaces/manga/service';

const isAnimeServiceParamsTypeGuard = (
  params: AnimeServiceParams | MangaServiceParams,
): params is AnimeServiceParams => 'sort_direction' in params;

export default isAnimeServiceParamsTypeGuard;
