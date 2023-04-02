import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useMediaInfoStyles = makeStyles((theme: Theme) => ({
  content: {
    position: 'relative',
    height: '100%',
  },
  posterWrapper: {
    position: 'relative',
    minHeight: 250,
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  poster: {
    width: 240,
    height: 360,
    overflow: 'hidden',
    position: 'absolute',
    top: -130,
    left: 0,
    right: 0,
    borderRadius: 16,
    boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.3)',

    '@media (min-width: 0) and (max-width: 600px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      top: -230,
      textAlign: 'center',
      height: 330,
    },
  },
  posterInfo: {
    width: 'calc(100% - 260px)',
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 0) and (max-width: 600px)': {
      width: '100%',
      marginTop: 100,
    },
  },
  itemKey: {
    marginLeft: 3,
  },
  bannerWrapper: {
    position: 'relative',
    height: 300,
  },
  bannerImage: {
    position: 'absolute',
    height: 300,
  },
  detailContent: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 10px',

    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '0 5px',
    },
  },
  title: {
    margin: '10px 0px 0px 0px',
    fontSize: 25,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '@media (min-width: 0) and (max-width: 991px)': {
      fontSize: 18,
    },
  },
  text: {
    color: `${theme.palette.text.primary}`,
    display: 'inline-flex',
  },
  typeList: {
    marginTop: 5,
    color: theme.palette.text.secondary,
  },
  typeListItem: {
    fontWeight: 500,
    fontSize: 15,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  link: {
    color: `${theme.palette.text.primary}`,
    marginRight: 2,
    borderRadius: 5,
    marginTop: 4,
    padding: '1px 4px',
    backgroundColor: `${theme.palette.background.default}`,
    border: `1px solid ${theme.palette.text.secondary}`,
    transition: 'opacity 0.2s ease-out',

    '&:hover': {
      transition: 'opacity 0.2s ease-out',
      opacity: '0.7',
    },

    '&:first-child': {
      marginLeft: 3,
    },
  },
}));

export default useMediaInfoStyles;
