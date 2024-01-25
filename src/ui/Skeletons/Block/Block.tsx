import { FC } from 'react';

import clsx from 'clsx';

import { SkeletonProps } from '@interfaces/common';

import { ESkeleton } from '@enums/enums';

import useSkeletonTheme from '@hooks/useSkeletonTheme';

import useSkeletonBlockStyles from './Block.styles';

type SkeletonBlockProps = SkeletonProps & {
  width?: number | string;
  height?: number | string;
};

const SkeletonBlock: FC<SkeletonBlockProps> = ({
  width,
  height,
  skeletonType,
  className,
}) => {
  const skeleton = useSkeletonTheme(skeletonType || ESkeleton.pulseAuto);
  const classes = useSkeletonBlockStyles();

  return (
    <div style={{ width, height }} className={clsx(classes.skeletonBlock, skeleton, className)} />
  );
};

export default SkeletonBlock;
