import { FC } from 'react';

import clsx from 'clsx';

import { EPlaceholder } from '@enums/enums';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';
import Link from '@ui/Link';

import useCheckWebpSupport from '@hooks/useCheckWebpSupport';

import useCardItemStyles from './CardItem.styles';

export type CardItemProps = {
  id: number;
  pathTo: string;
  title?: string;
  type?: string;
  year?: number;
  hideTitle?: boolean;
  hideType?: boolean;
  imageSource?: string;
  className?: string;
};

const CardItem: FC<CardItemProps> = ({
  id,
  title,
  type,
  year,
  hideTitle,
  hideType,
  pathTo,
  imageSource,
  className,
}) => {
  const classes = useCardItemStyles();
  const image = useCheckWebpSupport(id);
  const currentImage = imageSource || image;

  return (
    <article className={clsx(classes.cardItem, className)}>
      <Link path={pathTo} className={clsx(classes.cardLink)} attributeTitle={title}>

        <ImageWithPlaceholder
          alt={title}
          src={currentImage}
          className={classes.image}
          placeholderVariant={EPlaceholder.poster}
        />

        {title && <div className={clsx(classes.cardItemContent, { [classes.hide]: hideTitle })}>
          <h3 className={classes.title} itemProp="name">
            {title}
          </h3>

          <div className={classes.cardItemContentInfo}>
            {type && <h4 className={clsx(classes.cardItemContentInfoType, { [classes.hide]: hideType })}>{type}</h4>}
            {year && <span className={classes.cardItemContentInfoYear}>{year}</span>}
          </div>
        </div>
        }
      </Link>
    </article>
  );
};

export default CardItem;
