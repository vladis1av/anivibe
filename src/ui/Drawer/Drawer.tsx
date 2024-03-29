import { FC, ReactNode } from 'react';

import Button from '@mui/material/Button';
import clsx from 'clsx';

import CloseSVG from '@assets/svg/close';

import useBlockScroll from '@hooks/useBlockScroll';

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

  useBlockScroll(isOpen);

  return (
    <div className={clsx(
      classes.drawer,
      className,
      { [classes.showDrawer]: isOpen },
      { [classes[anchor]]: anchor },
    )}>
      <Button variant="text" onClick={onClose} className={classes.closeButton}>
        <CloseSVG className={classes.closeIcon} />
      </Button>

      {children}
    </div>
  );
};

export default Drawer;
