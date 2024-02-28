import { FC } from 'react';

import isMangaBaseType from '@typeGuards/isMangaBaseType';

import { FilteredData } from '@redux/slices/filteredData';

import CardItem from '@ui/CardItem';

import formatAnimePath from '@utils/formatting/formatAnimePath';
import formatMangaPath from '@utils/formatting/formatMangaPath';

import useFilterCardStyles from './FilterCardList.styles';

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
          imageSource={image.preview}
          pathTo={formatMangaPath(id, name)}
          className={classes.cardListItem}
        />;
      })
    }
  </section>;
};

export default FilterCardList;
