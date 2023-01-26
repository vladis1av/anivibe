import { FC, useEffect } from 'react';

import clsx from 'clsx';

import useCardItemStyles from './Overlay.styles';

export type OverlayProps = {
  overlayIsOpen: boolean
};

const Overlay: FC<OverlayProps> = ({ overlayIsOpen }) => {
  const classes = useCardItemStyles();

  useEffect(() => {
    if (overlayIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [overlayIsOpen]);

  return (
    <div className={clsx(classes.overlay, { [classes.showOverlay]: overlayIsOpen })} />
  );
};

export default Overlay;
