import { makeStyles } from '@mui/styles';

const useCardItemStyles = makeStyles(() => ({
  link: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 200,
    width: '100%',
    color: 'inherit',
    transition: 'all 0.2s ease-out',

    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'all 0.2s ease-out',
    },
  },
  cardItemContent: {
    width: '100%',
    padding: 0,
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    overflow: 'hidden',
    borderRadius: 22,
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  big: {
    maxWidth: 220,
    width: '100%',
    borderRadius: 22,
    overflow: 'hidden',
    height: 330,

    '&:hover': {
      boxShadow: '0px 0px 11px 0px rgba(34, 60, 80, 0.50)',
    },
  },
}));

export default useCardItemStyles;
