import { EReliaseKeyType } from '@interfaces/common';

import { EMangaReliase, EReliaseKey } from '@enums/enums';

import { APP_NAME_UPPER_CASE } from '@constants/seo';

import replaceLastCharacter from '../regexp/replaceLastCharacter';

const getTitle = (type: string) => `Легко и удобно читать ${type} онлайн на ${APP_NAME_UPPER_CASE}`;

const getMangaSeoTitle = (mangaType: EReliaseKeyType) => {
  const reliaseType = EMangaReliase[mangaType];
  const defaultType = replaceLastCharacter(reliaseType, 'у');
  const title = getTitle(defaultType);

  switch (mangaType) {
    case EReliaseKey.manga:
    case EReliaseKey.manhwa:
      return title;

    case EReliaseKey.manhua:
      return getTitle(reliaseType);

    default:
      return title;
  }
};

export default getMangaSeoTitle;
