import { FC } from 'react';

import { SkeletonProps } from '@interfaces/common';

import getEmptyArray from '@utils/array/getEmptyArray';

import useCarouselSkeletonStyles from './Carousel.styles';
import SkeletonBlock from '../Block';
import CardItemSkeleton from '../CardItem';

const emptyArray = getEmptyArray(8);

const CarouselSkeleton: FC<Omit<SkeletonProps, 'className'>> = ({ skeletonType }) => {
  const classes = useCarouselSkeletonStyles();

  return (
    <section className={classes.carouselSkeletonWrapper}>
      <header className={classes.titleWrapper}>
        <SkeletonBlock className={classes.text} width={300} height={20} skeletonType={skeletonType} />

        <SkeletonBlock className={classes.arrow} width={30} height={20} skeletonType={skeletonType} />
      </header>

      <ul className={classes.cardList}>
        {
          emptyArray.map(() => <li className={classes.cardListItem}>
            <CardItemSkeleton skeletonType={skeletonType} />
          </li>)
        }
      </ul>
    </section>
  );
};

export default CarouselSkeleton;
