import { MangaBase } from '@interfaces/manga';

import { FilteredData } from '@redux/slices/filteredData';

const isMangaBaseType = (item: FilteredData[0]): item is MangaBase => 'reading' in item;

export default isMangaBaseType;
