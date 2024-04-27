import { FC } from 'react';

import isMangaBaseType from '@typeGuards/isMangaBaseType';

import { FilteredData } from '@redux/slices/filteredData';

import CardItem from '@ui/CardItem';

import getNextEnv from '@utils/config/getNextEnv';
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
          const { id, names, code } = item;

          return <CardItem
            key={id}
            id={id}
            title={names.ru}
            pathTo={formatAnimePath(id, code)}
          />;
        }

        const {
          id, russian, name, image,
        } = item;

        return <CardItem
          key={id}
          id={id}
          title={russian}
          imageSource={changeDomainZone(image.preview, MANGA_IMAGE_POSTER_DOMAIN)}
          pathTo={formatMangaPath(id, name)}
          className={classes.cardListItem}
        />;
      })
    }
  </section>;
};

export default FilterCardList;
