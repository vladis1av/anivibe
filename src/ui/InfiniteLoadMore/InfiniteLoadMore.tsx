import { FC, useEffect } from 'react';

import { Button, CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import useInfiniteLoadMoreStyles from './InfiniteLoadMore.styles';

type InfiniteLoadMoreProps = {
  isPending: boolean;
  isError: boolean;
  loadMoreCallback: () => void;
  errorText: string;
  defaultText: string;
};

const InfiniteLoadMore: FC<InfiniteLoadMoreProps> = ({
  isPending,
  isError,
  loadMoreCallback,
  errorText,
  defaultText,
}) => {
  const classes = useInfiniteLoadMoreStyles();

  const { inView, ref } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView && !isError && !isPending) {
      loadMoreCallback();
    }
  }, [inView]);

  return <div className={classes.buttonWrapper} ref={ref}>
    <Button variant="outlined" onClick={loadMoreCallback} disabled={isPending || isError}>
      {
        isError ? errorText : defaultText
      }

      {isPending && (
        <CircularProgress size={20} color="primary" className={classes.loader} />
      )}
    </Button>
  </div>;
};

export default InfiniteLoadMore;
