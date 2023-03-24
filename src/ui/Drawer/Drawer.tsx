import { FC, ReactNode } from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx';

import CloseSVG from '@assets/svg/close';

import useDrawerStyles from './Drawer.styles';

export type DrawerProps = {
  isOpen: boolean;
  permanent?: boolean;
  anchor?: 'left' | 'right',
  onClose: () => void;
  className?: string;
  children: ReactNode;
};

const Drawer: FC<DrawerProps> = ({
  isOpen,
  anchor = 'right',
  onClose,
  className,
  children,
}) => {
  const classes = useDrawerStyles();

  return (
    <div className={clsx(
      classes.drawer,
      className,
      { [classes.showDrawer]: isOpen },
      { [classes[anchor]]: anchor },
    )}>
      <Button variant="text" onClick={onClose} className={classes.closeButton}>
        <CloseSVG />
      </Button>

      {children}
    </div>
  );
};

export default Drawer;
