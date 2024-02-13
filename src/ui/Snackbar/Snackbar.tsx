import {
  FC,
  useRef,
  ReactNode,
  CSSProperties,
} from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx';

import { EPositionKeyType, EPositionValueType } from '@interfaces/common';

import { EPosition } from '@enums/enums';

import CloseSVG from '@assets/svg/close';

import useTimeout from '@hooks/useTimeout';

import useCommonStyles from '@styles/Common.styles';

import useSnackbarStyles from './Snackbar.styles';

type SnackbarProps = {
  message: ReactNode;
  isStatic?: boolean;
  showCloseButton?: boolean;
  autoHideDurationMs?: number;
  position?: EPositionValueType;
  className?: string;
  onClose: () => void;
};

const transformPosition: Record<EPositionKeyType, string> = {
  topRight: 'translateX(2000px)',
  topCenter: 'translateY(-1300px)',
  topLeft: 'translateX(-2000px)',
  bottomLeft: 'translateX(-2000px)',
  bottomCenter: 'translateY(1300px)',
  bottomRight: 'translateX(2000px)',
};

const Snackbar: FC<SnackbarProps> = ({
  message,
  isStatic,
  position = EPosition.topLeft,
  className,
  showCloseButton,
  autoHideDurationMs,
  onClose,
}) => {
  const classes = useSnackbarStyles();
  const commonClasses = useCommonStyles();
  const snackbarRef = useRef<null | HTMLDivElement>(null);

  const onRemove = () => {
    if (snackbarRef.current) {
      snackbarRef.current.style.animation = 'toast-out .8s both';
      snackbarRef.current.addEventListener('animationend', () => {
        onClose();
      });
    }
  };
  useTimeout(onRemove, autoHideDurationMs);

  const style: CSSProperties = {
    ['--elm-translate' as string]: transformPosition[position],
    animation: 'toast-in .8s both',
  };

  return (
    <div
      ref={snackbarRef}
      style={style}
      className={clsx(
        classes.snackbar,
        commonClasses[position],
        { [classes.snackbarStatic]: isStatic },
        className,
      )}
    >
      <div className={classes.snackbarMessage}>{message}</div>

      {
        showCloseButton && <Button className={classes.button} onClick={onRemove}>
          <CloseSVG className={classes.closeIcon} />
        </Button>
      }
    </div>
  );
};

export default Snackbar;
