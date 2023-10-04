import { makeStyles } from '@mui/styles';

const useVideoPlayerStyles = makeStyles(() => ({
  videoPlayerWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    borderRadius: 8,
    outline: 'none',
    zIndex: 2,
  },
  videoPlayerFullScreen: {
    border: 'none',
  },
  videoPlayerPlaylistWrapper: {
    transitionDelay: '0.2s',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    zIndex: 20,
    position: 'absolute',
    left: 4,
    top: 4,
  },
  videoPlayerControls: {
    flexDirection: 'column',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    transitionDelay: '0.2s',
    position: 'absolute',
    opacity: 0,
    visibility: 'hidden',
    zIndex: 15,
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  showVideoPlayerControls: {
    '& $videoPlayerPlaylistWrapper': {
      opacity: 1,
      visibility: 'visible',
    },
    '& $videoPlayerControls': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  showVideoPlayerControlsOnHover: {
    '&:hover': {
      '& $videoPlayerPlaylistWrapper': {
        opacity: 1,
        visibility: 'visible',
      },
      '& $videoPlayerControls': {
        opacity: 1,
        visibility: 'visible',
      },
    },
  },
  hideVideoPlayerControls: {
    '&:hover': {
      '& $videoPlayerPlaylistWrapper': {
        opacity: 0,
        visibility: 'hidden',
      },
      '& $videoPlayerControls': {
        opacity: 0,
        visibility: 'hidden',
      },
    },
  },
}));

export default useVideoPlayerStyles;
