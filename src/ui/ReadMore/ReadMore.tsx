import { FC, useState } from 'react';

import { Button } from '@mui/material';

import useReadMoreStyles from './ReadMore.styles';

type ReadMoreProps = {
  text: string;
};

const ReadMore: FC<ReadMoreProps> = ({ text }) => {
  const classes = useReadMoreStyles();
  const [showMore, setShowMore] = useState<boolean>(true);
  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <span className={classes.text}>
      {showMore ? `${text.slice(0, 250)}...` : text}

      <div className={classes.buttonWrapper}>
        <Button color="primary" size="small" onClick={toggleShowMore} className={classes.button}>
          {showMore ? 'Подробнее...' : 'Свернуть'}
        </Button>
      </div>
    </span>
  );
};

export default ReadMore;
