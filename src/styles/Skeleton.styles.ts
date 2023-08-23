import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ETheme } from '@enums/enums';

const useSkeletonStyles = makeStyles((theme: Theme) => ({
  skeletonAutoTheme: {
    animation: '$skeleton-auto-theme 1s linear infinite alternate',
  },
  skeletonLightTheme: {
    animation: '$skeleton-light-theme 1s linear infinite alternate',
  },
  skeletonDarkTheme: {
    animation: '$skeleton-dark-theme 1s linear infinite alternate',
  },
  '@keyframes skeleton-auto-theme': {
    '0%': {
      backgroundColor: `${theme.palette.mode === ETheme.dark ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 92%)'}`,
    },
    '100%': {
      backgroundColor: `${theme.palette.mode === ETheme.dark ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 75%)'}`,
    },
  },
  '@keyframes skeleton-light-theme': {
    '0%': {
      backgroundColor: 'hsl(0, 0%, 92%)',
    },
    '100%': {
      backgroundColor: 'hsl(0, 0%, 75%)',
    },
  },
  '@keyframes skeleton-dark-theme': {
    '0%': {
      backgroundColor: 'hsl(0, 0%, 70%)',
    },
    '100%': {
      backgroundColor: 'hsl(0, 0%, 30%)',
    },
  },
  skeletonFull: {
    width: '100%',
    height: '100%',
  },
}));

export default useSkeletonStyles;
