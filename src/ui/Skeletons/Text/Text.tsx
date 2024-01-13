import { FC } from 'react';

import clsx from 'clsx';

import { SkeletonProps } from '@interfaces/common';

import { ESkeleton } from '@enums/enums';

import useSkeletonTheme from '@hooks/useSkeletonTheme';

import useTextSkeletonStyles from './Text.styles';

type TextSkeletonProps = SkeletonProps & {
  width?: number;
  height?: number;
};

const TextSkeleton: FC<TextSkeletonProps> = ({
  width,
  height,
  skeletonType,
  className,
}) => {
  const skeleton = useSkeletonTheme(skeletonType || ESkeleton.pulseAuto);
  const classes = useTextSkeletonStyles();

  return (
    <span className={clsx(classes.textSkeleton, skeleton, className)} style={{ width, height }} />
  );
};

export default TextSkeleton;
