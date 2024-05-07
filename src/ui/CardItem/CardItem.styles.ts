import { makeStyles } from '@mui/styles';

const useCardItemStyles = makeStyles(() => ({
  cardItem: {
    maxWidth: 200,
    width: '100%',
    transition: 'all 0.2s ease-out',

    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'all 0.2s ease-out',
    },
  },
  cardLink: {
    color: 'inherit',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    display: 'block',
    textAlign: 'center',
  },
}));

export default useCardItemStyles;
