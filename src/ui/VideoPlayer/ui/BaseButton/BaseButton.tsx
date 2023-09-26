import { FC, ReactNode } from 'react';

import Button from '@mui/material/Button';
import clsx from 'clsx';

import useBaseButtonStyles from './BaseButton.styles';

type BaseButtonProps = {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
};

const BaseButton: FC<BaseButtonProps> = ({
  onClick,
  className,
  children,
}) => {
  const classes = useBaseButtonStyles();
  const buttonClassNames = clsx(classes.videoPlayerBaseButton, className);

  return (
    <Button
      className={buttonClassNames}
      onClick={onClick}
      variant="text"
    >
      {children}
    </Button>
  );
};

export default BaseButton;
