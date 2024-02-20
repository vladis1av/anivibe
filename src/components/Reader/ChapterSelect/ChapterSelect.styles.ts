import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useChapterSelectStyles = makeStyles(() => ({
  chapterSelect: {
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '& select': {
      height: 24,
      borderRadius: 4,
      border: `1px solid ${EColor.white}`,
      backgroundColor: EColor.halfTransparentBlack,

      paddingLeft: 10,
      '& option': {
        color: EColor.white,
      },
    },

    '& .MuiNativeSelect-iconFilled': {
      transform: 'rotate(180deg)',
      fill: EColor.white,
    },
    '& select:not([multiple])': {
      color: EColor.white,
      backgroundColor: EColor.halfTransparentBlack,
    },
    '&:before': {
      borderBottom: `1px solid ${EColor.white}`,
      borderRadius: 4,
    },
    '&:after': {
      borderBottom: `2px solid ${EColor.white}`,
      borderRadius: 4,
    },
    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
}));

export default useChapterSelectStyles;
