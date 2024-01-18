import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ETheme } from '@enums/enums';

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

    borderRadius: 16,
    boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.3)',

    '@media (min-width: 0) and (max-width: 600px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      top: -230,
      textAlign: 'center',
      width: 210,
      height: 310,
    },
  },
  posterPosition: {
    overflow: 'hidden',
    position: 'absolute',
    top: -130,
    left: 0,
    right: 0,
  },
  posterInfo: {
    width: 'calc(100% - 260px)',
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 0) and (max-width: 600px)': {
      width: '100%',
      marginTop: 185,
    },
  },
  bannerWrapper: {
    position: 'relative',
    height: 300,
  },
  bannerImage: {
    position: 'absolute',
    height: 300,
  },
  bannerImageGradient: {
    background: `${theme.palette.mode === ETheme.dark
      ? `linear-gradient(180deg,transparent,
        rgba(15,15,15,.009) 6.67%,
      rgba(15,15,15,.036) 13.33%,
      rgba(15,15,15,.082) 20%,
      rgba(15,15,15,.147) 26.67%,
      rgba(15,15,15,.232) 33.33%,
      rgba(15,15,15,.332) 40%,
      rgba(15,15,15,.443) 46.67%,
      rgba(15,15,15,.557) 53.33%,
      rgba(15,15,15,.668) 60%,
      rgba(15,15,15,.768) 66.67%,
      rgba(15,15,15,.853) 73.33%,
      rgba(15,15,15,.918) 80%,
      rgba(15,15,15,.964) 86.67%,
      rgba(15,15,15,.991) 93.33%,
      rgba(15,15,15,1))
      `
      : `linear-gradient(180deg,transparent,
        rgba(255,255,255,.009) 6.67%,
      rgba(255,255,255,.036) 13.33%,
      rgba(255,255,255,.082) 20%,
      rgba(255,255,255,.147) 26.67%,
      rgba(255,255,255,.232) 33.33%,
      rgba(255,255,255,.332) 40%,
      rgba(255,255,255,.443) 46.67%,
      rgba(255,255,255,.557) 53.33%,
      rgba(255,255,255,.668) 60%,
      rgba(255,255,255,.768) 66.67%,
      rgba(255,255,255,.853) 73.33%,
      rgba(255,255,255,.918) 80%,
      rgba(255,255,255,.964) 86.67%,
      rgba(255,255,255,.991) 93.33%,
      rgba(255,255,255,1))
      `}`,
    position: 'absolute',
    bottom: '-5px',
    width: '100%',
    height: '100%',
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
    fontSize: 25,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',

    '@media (min-width: 0) and (max-width: 991px)': {
      fontSize: 18,
    },
  },
  secondTitle: {
    fontSize: 18,
    fontWeight: 500,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: 5,
    marginBottom: 3,
    opacity: 0.7,

    '@media (min-width: 0) and (max-width: 991px)': {
      fontSize: 15,
    },
  },
  typeList: {
    marginTop: 5,
    color: theme.palette.text.secondary,
  },
  typeListLoading: {
    display: 'flex',
    flexDirection: 'column',
  },
  descriptionSkeleton: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  playerLoader: {
    padding: '25.25%',
    width: '100%',
    height: 350,
  },
  postInfoLoader: {
    width: 'calc(100% - 260px)',
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 0) and (max-width: 600px)': {
      width: '100%',
      marginTop: 185,
    },
  },
  bannerLoader: {
    position: 'absolute',
  },
  typeListItem: {
    fontWeight: 500,
    fontSize: 15,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
}));

export default useMediaInfoStyles;
