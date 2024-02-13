import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import { EPositionValueType } from '@interfaces/common';

import useCommonStyles from '@styles/Common.styles';

import useSnackbarContainerStyles from './SnackbarContainer.styles';

type ToastProps = {
  children: ReactNode;
  position: EPositionValueType;
  contanerClassName?: string;
};

const Toast: FC<ToastProps> = ({ children, position, contanerClassName }) => {
  const classes = useSnackbarContainerStyles();
  const commonClasses = useCommonStyles();

  return (
    <div className={clsx(classes.snackbarContainer, commonClasses[position], contanerClassName)}>
      {children}
    </div>
  );
};

export default Toast;
