import clsx from 'clsx';

import { ESkeletonType } from '@interfaces/common';

import { ESkeleton } from '@enums/enums';

import useSkeletonStyles from '@styles/Skeleton.styles';

const useSkeletonTheme = (currentSkeletonTheme: ESkeletonType): string => {
  const classes = useSkeletonStyles();

  switch (currentSkeletonTheme) {
    case ESkeleton.pulseAuto:
    case ESkeleton.pulseDark:
    case ESkeleton.pulseLight:
      return classes[currentSkeletonTheme];
    case ESkeleton.waveAuto:
    case ESkeleton.waveDark:
    case ESkeleton.waveLight:
      return clsx(classes.waveBase, classes[currentSkeletonTheme]);
    default:
      return classes.pulseAuto;
  }
};

export default useSkeletonTheme;
