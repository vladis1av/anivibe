import {
  FC, ReactNode,
} from 'react';

import clsx from 'clsx';

import CloseSVG from '@assets/svg/close';

import useModalStyles from './Modal.styles';

type ModalProps = {
  title?: string;
  showCloseButton?: boolean;
  children: ReactNode;
  className?: string;
  onClose: () => void;
  isOpen: boolean;
};

const Modal: FC<ModalProps> = ({
  title,
  showCloseButton,
  children,
  className,
  onClose,
  isOpen,
}) => {
  const classes = useModalStyles();

  return (
    <div className={clsx(
      classes.modal,
      {
        [classes.modalActive]: isOpen,
      },
      className,
    )}
    onClick={onClose}
    >
      <div
        className={clsx(
          classes.modalContent,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modalContentHead}>
          {
            title && <span className={classes.modalTitle}>{title}</span>
          }

          {
            showCloseButton && <span className={classes.modalCloseIcon} onClick={onClose}><CloseSVG /></span>
          }
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
