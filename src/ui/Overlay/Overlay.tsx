import { FC } from 'react';

import clsx from 'clsx';

import useBlockScroll from '@hooks/useBlockScroll';

import useCardItemStyles from './Overlay.styles';

export type OverlayProps = {
  overlayIsOpen: boolean
};

const Overlay: FC<OverlayProps> = ({ overlayIsOpen }) => {
  const classes = useCardItemStyles();

  useBlockScroll(overlayIsOpen);

  return (
    <div className={clsx(classes.overlay, { [classes.showOverlay]: overlayIsOpen })} />
  );
};

export default Overlay;
