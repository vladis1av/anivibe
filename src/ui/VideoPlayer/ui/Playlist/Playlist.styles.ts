import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const usePlaylistStyles = makeStyles(() => ({
  videoPlayerPlaylist: {
    maxWidth: 170,
    width: '100%',
  },
  paper: {
    backgroundColor: EColor.darkTransparent,
    borderRadius: 8,
    marginTop: 5,
    color: EColor.white,
    overflow: 'hidden',
  },
  root: {
    borderRadius: 8,
    backgroundColor: EColor.darkTransparent,
    maxWidth: 170,
    width: '100%',
    overflow: 'hidden',

    '& .MuiSvgIcon-root': {
      fill: EColor.white,
    },
    '& .Mui-focused': {
      backgroundColor: EColor.lightTransparent,
    },
    '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
      backgroundColor: EColor.lightTransparent,
    },
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
    {
      backgroundColor: EColor.lightTransparent,

    },
    '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
      backgroundColor: EColor.transparent,
    },
    "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']":
    {
      backgroundColor: EColor.transparent,
    },
  },
  inputRoot: {
    color: EColor.white,
    transition: 'background-color 0.2s ease-out',

    '&:hover': {
      backgroundColor: EColor.lightTransparent,
      borderColor: 'transparent',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: EColor.transparent,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: EColor.transparent,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: EColor.transparent,
    },

  },
}));

export default usePlaylistStyles;
