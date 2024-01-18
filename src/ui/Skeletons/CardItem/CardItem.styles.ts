import { makeStyles } from '@mui/styles';

const useCardItemSkeletonStyles = makeStyles(() => ({
  cardItemSkeletonWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardItemSkeleton: {
    width: 220,
    height: 330,
    borderRadius: 22,
  },
  cardItemSkeletonText: {
    marginTop: 10,
    margin: '0 auto',
  },
}));

export default useCardItemSkeletonStyles;
