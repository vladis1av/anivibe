import { EThemeType } from '@interfaces/theme';

import { ETheme } from '@enums/enums';

import useSkeletonStyles from '@styles/Skeleton.styles';

const useSkeletonTheme = (currentSkeletonTheme: EThemeType): string => {
  const classes = useSkeletonStyles();
  switch (currentSkeletonTheme) {
    case ETheme.auto:
      return classes.skeletonAutoTheme;
    case ETheme.dark:
      return classes.skeletonDarkTheme;
    case ETheme.light:
      return classes.skeletonLightTheme;
    default:
      return classes.skeletonAutoTheme;
  }
};

export default useSkeletonTheme;
