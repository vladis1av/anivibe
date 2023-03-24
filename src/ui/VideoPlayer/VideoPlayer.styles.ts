import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useVideoPlayerStyles = makeStyles((theme: Theme) => ({
  videoPlayerWrapper: {
    position: 'relative',
    paddingTop: '56.25%',
    outline: 'none',
    overflow: 'hidden',
    borderRadius: 8,
    border: `1px solid ${theme.palette.text.secondary}`,
  },
  videoPlayerFullScreen: {
    border: 'none',
  },
  videoPlayerPlaylistWrapper: {
    transitionDelay: '0.2s',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    zIndex: 15,
    position: 'absolute',
    left: 5,
    top: 5,
  },
  videoPlayerControls: {
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    transitionDelay: '0.2s',
    position: 'absolute',
    opacity: 0,
    visibility: 'hidden',
    zIndex: 15,
    bottom: 0,
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
