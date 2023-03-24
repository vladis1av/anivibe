import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useSearchCardStyles = makeStyles(() => ({
  searchCard: {
    padding: 7,
    backgroundColor: EColor.white,
    color: EColor.black,
    display: 'flex',
    marginBottom: 10,
    borderRadius: 22,
    width: '100%',
    maxHeight: 114,
    height: '100%',
    transition: 'all 0.2s ease-out',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  searchCardImage: {
    width: 100,
    height: 100,
    borderRadius: 22,
    overflow: 'hidden',
  },
  infoList: {
    width: '100%',
    marginLeft: 5,
    fontSize: 13,
    overflow: 'hidden',
  },
  title: {
    margin: 0,
    marginTop: 5,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 1,
    marginBottom: 3,
  },
  genre: {
    fontWeight: 'bold',
  },
}));

export default useSearchCardStyles;
