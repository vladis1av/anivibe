import { FC } from 'react';

import isMangaBaseType from '@typeGuards/isMangaBaseType';

import { FilteredData } from '@redux/slices/filteredData';

import CardItem from '@ui/CardItem';

import generateAnimePath from '@utils/generateAnimePath';
import generateMangaPath from '@utils/generateMangaPath';

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
            pathTo={generateAnimePath(id, code)}
          />;
        }

        const {
          id, russian, name, image,
        } = item;

        return <CardItem
          key={id}
          id={id}
          title={russian}
          imageSource={image.original}
          pathTo={generateMangaPath(id, name)}
        />;
      })
    }
  </section>;
};

export default FilterCardList;
