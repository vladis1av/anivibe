import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ETheme } from '@enums/enums';

const useSkeletonStyles = makeStyles((theme: Theme) => ({
  pulseAuto: {
    animation: '$skeleton-pulse-auto 1s ease-in-out infinite alternate',
  },
  pulseLight: {
    animation: '$skeleton-pulse-light 1s ease-in-out infinite alternate',
  },
  pulseDark: {
    animation: '$skeleton-pulse-dark 1s ease-in-out infinite alternate',
  },
  waveBase: {
    display: 'inline-flex',
    position: 'relative',
    overflow: 'hidden',
    height: '100%',
    width: '100%',

    '&::after': {
      position: 'absolute',
      display: 'block',
      top: 0,
      right: 0,
      height: '100%',
      bottom: 0,
      left: 0,
      transform: 'translateX(-100%)',
      backgroundRepeat: 'no-repeat',
      animation: '$skeleton-wave 1.5s linear infinite',
      content: '" "',
    },
  },
  waveAuto: {
    backgroundColor: `${theme.palette.mode === ETheme.dark ? '#292929' : '#f0f2f5'}`,
    '&::after': {
      backgroundImage: `${theme.palette.mode === ETheme.dark
        ? `linear-gradient(90deg, rgba(139, 139, 139, 0) 0,
      rgba(139, 139, 139, 0.2) 20%, rgba(139, 139, 139, 0.5) 60%, rgba(139, 139, 139, 0))`
        : `linear-gradient(90deg, rgba(200, 200, 200, 0) 0,
      rgba(200, 200, 200, 0.2) 20%, rgba(200, 200, 200, 0.5) 60%, rgba(200, 200, 200, 0))`}`,
    },
  },
  waveDark: {
    backgroundColor: '#292929',
    '&::after': {
      backgroundImage: 'rgba(139, 139, 139, 0.2) 20%, rgba(139, 139, 139, 0.5) 60%, rgba(139, 139, 139, 0))',
    },
  },
  waveLight: {
    backgroundColor: '#f0f2f5',
    '&::after': {
      backgroundImage: `linear-gradient(90deg, rgba(200, 200, 200, 0) 0,
      rgba(200, 200, 200, 0.2) 20%, rgba(200, 200, 200, 0.5) 60%, rgba(200, 200, 200, 0))`,
    },
  },
  '@keyframes skeleton-pulse-auto': {
    '0%': {
      backgroundColor: `${theme.palette.mode === ETheme.dark ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 92%)'}`,
    },
    '100%': {
      backgroundColor: `${theme.palette.mode === ETheme.dark ? 'hsl(0, 0%, 30%)' : 'hsl(0, 0%, 75%)'}`,
    },
  },
  '@keyframes skeleton-pulse-light': {
    '0%': {
      backgroundColor: 'hsl(0, 0%, 92%)',
    },
    '100%': {
      backgroundColor: 'hsl(0, 0%, 75%)',
    },
  },
  '@keyframes skeleton-pulse-dark': {
    '0%': {
      backgroundColor: 'hsl(0, 0%, 70%)',
    },
    '100%': {
      backgroundColor: 'hsl(0, 0%, 30%)',
    },
  },
  '@keyframes skeleton-wave': {
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  skeletonFull: {
    width: '100%',
    height: '100%',
  },
}));

export default useSkeletonStyles;
