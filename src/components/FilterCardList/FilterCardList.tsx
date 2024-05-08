/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';

import { EReleaseType } from '@interfaces/common';

import isMangaBaseType from '@typeGuards/isMangaBaseType';

import { ELocale, ERelease } from '@enums/enums';

import { FilteredData } from '@redux/slices/filteredData';

import CardItem from '@ui/CardItem';

import getNextEnv from '@utils/config/getNextEnv';
import FormatedDate from '@utils/date/formatedDate';
import formatAnimePath from '@utils/formatting/formatAnimePath';
import formatMangaPath from '@utils/formatting/formatMangaPath';
import changeDomainZone from '@utils/regexp/changeDomainZone';

import useFilterCardStyles from './FilterCardList.styles';

const { publicRuntimeConfig: { MANGA_IMAGE_POSTER_DOMAIN } } = getNextEnv();

type FilterCardListProps = {
  filteredList: FilteredData;
};

const FilterCardList: FC<FilterCardListProps> = ({
  filteredList,
}) => {
  const classes = useFilterCardStyles();

  return <section className={classes.cardsList}>
    {
      filteredList.map((item) => {
        if (!isMangaBaseType(item)) {
          const {
            id, names, code, season, type,
          } = item;

          return <CardItem
            id={id}
            key={id}
            title={names.ru}
            year={season.year}
            pathTo={formatAnimePath(id, code)}
            type={ERelease[type.string.toLowerCase() as EReleaseType] || ''}
          />;
        }

        const {
          id, russian, name, image, aired_on, kind,
        } = item;

        return <CardItem
          id={id}
          key={id}
          year={Number(FormatedDate.getFormatedDate(
            aired_on,
            ELocale.ru,
            true,
            { year: 'numeric' },
          ))}
          title={russian}
          className={classes.cardListItem}
          pathTo={formatMangaPath(id, name)}
          imageSource={changeDomainZone(image.preview, MANGA_IMAGE_POSTER_DOMAIN)}
          type={ERelease[kind as EReleaseType] || ''}
        />;
      })
    }
  </section>;
};

export default FilterCardList;
