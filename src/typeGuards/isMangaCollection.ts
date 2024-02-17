import { FetchedLastAnimeUpdatedResult } from '@interfaces/anime/service';
import { MangaBase } from '@interfaces/manga/manga';

const isMangaCollectionTypeGuard = (
  item: MangaBase | FetchedLastAnimeUpdatedResult,
): item is MangaBase => 'age_limit' in item;

export default isMangaCollectionTypeGuard;
