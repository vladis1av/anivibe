import { EMangaReleaseKindValueType } from '@interfaces/manga/service';

import { EMangaReleaseKind } from '@enums/enums';

import { MANGA_CATALOG_DESCRIPTION_TITLE_WORDS } from '@constants/common';

const getMangaFilterDescriptionPage = (type: EMangaReleaseKindValueType) => {
  const currentTypeTitle = MANGA_CATALOG_DESCRIPTION_TITLE_WORDS[type]
  || MANGA_CATALOG_DESCRIPTION_TITLE_WORDS[EMangaReleaseKind.manga];

  const pageViewTitle = type === EMangaReleaseKind.comics || type === EMangaReleaseKind.one_shot
    ? 'отображены' : 'отображена';

  return `На данной странице ${pageViewTitle} ${currentTypeTitle.toLocaleLowerCase()} отсортированные по рейтингу`;
};

export default getMangaFilterDescriptionPage;
