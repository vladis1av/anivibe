import { FC } from 'react';

import clsx from 'clsx';

import { SkeletonProps } from '@interfaces/common';

import { ESkeleton } from '@enums/enums';

import useSkeletonTheme from '@hooks/useSkeletonTheme';

import useCardItemSkeletonStyles from './CardItem.styles';
import SkeletonBlock from '../Block';

type CardItemSkeletonProps = SkeletonProps & {
  withTextSkeleton?: boolean;
};

const CardItemSkeleton: FC<CardItemSkeletonProps> = ({ skeletonType, withTextSkeleton, className }) => {
  const skeleton = useSkeletonTheme(skeletonType || ESkeleton.pulseAuto);
  const classes = useCardItemSkeletonStyles();

  return (
    <div className={classes.cardItemSkeletonWrapper}>
      <div className={clsx(classes.cardItemSkeleton, skeleton, className)} />

      {withTextSkeleton && <SkeletonBlock width={130} className={classes.cardItemSkeletonText}/>}
    </div>
  );
};

export default CardItemSkeleton;
