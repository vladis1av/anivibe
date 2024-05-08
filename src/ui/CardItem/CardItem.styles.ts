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
    paddingTop: 12,
    paddingLeft: 7,
    paddingRight: 7,
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
    margin: 0,
  },
  hide: {
    display: 'none',
  },
  cardItemContentInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  cardItemContentInfoType: {
    fontSize: 12,
    margin: 0,
    fontWeight: 500,
  },
  cardItemContentInfoYear: {
    fontSize: 12,
    fontWeight: 500,
  },
}));

export default useCardItemStyles;
