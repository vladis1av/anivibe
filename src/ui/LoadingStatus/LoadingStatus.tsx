import { FC } from 'react';

import { CircularProgress } from '@mui/material';
import clsx from 'clsx';

import useErrorStyles from './LoadingStatus.styles';

type LoadingStatusProps = {
  isPending: boolean;
  isError: boolean;
  className: string;
};

const LoadingStatus: FC<LoadingStatusProps> = ({ isPending, isError, className }) => {
  const classes = useErrorStyles();

  return (
    <>
      {(isPending || isError) && <div className={clsx(classes.loadingInfo, className)}>
        { isPending ? <CircularProgress color="inherit" /> : <span>Ничего не найдено</span>}
      </div>
      }
    </>
  );
};

export default LoadingStatus;
