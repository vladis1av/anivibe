import { CSSProperties, FC } from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx';

import { EHorizontalPosValueType, EVerticalPosValueType } from '@interfaces/common';

import { EHorizontalPos, EVerticalPos } from '@enums/enums';

import CloseSVG from '@assets/svg/close';

import useTimeout from '@hooks/useTimeout';

import useSnackbarStyles from './Snackbar.styles';

type SnackbarProps = {
  isOpen: boolean;
  message: string;
  anchorOrigin?: {
    horizontal: EHorizontalPosValueType;
    vertical: EVerticalPosValueType;
  };
  autoHideDurationMs?: number;
  showCloseButton?: boolean;
  className?: string;
  onClose: () => void;
};

const Snackbar: FC<SnackbarProps> = ({
  isOpen,
  message,
  anchorOrigin = { vertical: EVerticalPos.top, horizontal: EHorizontalPos.left },
  autoHideDurationMs,
  showCloseButton,
  className,
  onClose,
}) => {
  const classes = useSnackbarStyles();

  useTimeout(onClose, autoHideDurationMs);

  const style: CSSProperties = isOpen
    ? {
      opacity: 1,
      transform: 'none',
      transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    }
    : {
      opacity: 0,
      transform: 'scale(0.75,0.5625)',
      transition: 'opacity 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 130ms cubic-bezier(0.4, 0, 0.2, 1) 65ms',
    };

  return (
    <div className={clsx(
      classes.snackbar,
      classes[anchorOrigin.horizontal],
      classes[anchorOrigin.vertical],
      className,
    )}
    style={style}
    >
      <span className={classes.snackbarMessage}>{message}</span>

      {
        showCloseButton && <Button className={classes.button} onClick={onClose}>
          <CloseSVG className={classes.closeIcon} />
        </Button>
      }
    </div>
  );
};

export default Snackbar;
