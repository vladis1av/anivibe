import { FC } from 'react';

import clsx from 'clsx';

import { SkeletonProps } from '@interfaces/common';

import { ESkeleton } from '@enums/enums';

import useSkeletonTheme from '@hooks/useSkeletonTheme';

import useCardItemSkeletonStyles from './CardItem.styles';

const CardItemSkeleton: FC<SkeletonProps> = ({ skeletonType, className }) => {
  const skeleton = useSkeletonTheme(skeletonType || ESkeleton.pulseAuto);
  const classes = useCardItemSkeletonStyles();

  return (
    <div className={clsx(classes.cardItemSkeleton, skeleton, className)} />
  );
};

export default CardItemSkeleton;
