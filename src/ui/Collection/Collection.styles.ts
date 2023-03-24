import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useCollectionStyles = makeStyles((theme: Theme) => ({
  collectionWrapper: {
    marginTop: 30,
  },
  collectionHeader: {
    marginBottom: 5,
    paddingLeft: 60,
    paddingRight: 60,

    '@media (min-width: 0) and (max-width: 1370px)': {
      paddingLeft: 10,
      paddingRight: 10,
    },

    '@media (min-width: 0) and (max-width: 400px)': {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  collectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.2s ease-out',

    '&:hover': {
      opacity: 0.8,
    },

    '@media (min-width: 0) and (max-width: 500px)': {
      fontSize: '1.3rem',
    },
  },
  collectionTitleSvg: {
    display: 'flex',
    width: 25,
    height: 25,
    transform: 'rotate(180deg)',
    marginLeft: 10,

    '& path': {
      fill: theme.palette.text.primary,
    },

    '@media (min-width: 0) and (max-width: 500px)': {
      width: 20,
      height: 20,
    },
  },
  collectionLink: {
    color: 'inherit',
    display: 'flex',
    maxWidth: 1800,

    '@media (min-width: 0) and (max-width: 1370px)': {
      maxWidth: 1900,
    },
    '@media (min-width: 0) and (max-width: 400px)': {
      maxWidth: 1910,
    },
  },
  slider: {
    display: 'flex',
  },
}));

export default useCollectionStyles;
