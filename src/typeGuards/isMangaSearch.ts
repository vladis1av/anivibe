import { SearchAnimeType } from '@interfaces/anime/service';
import { MangaBase } from '@interfaces/manga/manga';

const isMangaSearchTypeGuard = (item: MangaBase | SearchAnimeType): item is MangaBase => 'age_limit' in item;

export default isMangaSearchTypeGuard;
