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
  hideTitle?: boolean;
  imageSource?: string;
  big?: boolean;
  className?: string;
};

const CardItem: FC<CardItemProps> = ({
  id,
  title,
  hideTitle,
  pathTo,
  imageSource,
  big = false,
  className,
}) => {
  const classes = useCardItemStyles();
  const image = useCheckWebpSupport(id);
  const currentImage = imageSource || image;

  return (
    <article className={clsx(classes.cardItem, { [classes.big]: big, className })}>
      <Link path={pathTo} className={clsx(classes.cardLink)}>

        <ImageWithPlaceholder
          src={currentImage}
          className={classes.image}
          alt={title}
          placeholderVariant={EPlaceholder.poster}
        />

        {title && !hideTitle && <div className={classes.cardItemContent}>
          <span className={classes.title} itemProp="name">
            {title}
          </span>
        </div>
        }
      </Link>
    </article>
  );
};

export default CardItem;
