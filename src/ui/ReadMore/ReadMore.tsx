import { FC, useState } from 'react';

import { Button } from '@mui/material';

import useReadMoreStyles from './ReadMore.styles';

type ReadMoreProps = {
  text: string;
  itemPropTitle?: string;
};

const ReadMore: FC<ReadMoreProps> = ({ text, itemPropTitle }) => {
  const classes = useReadMoreStyles();
  const [showMore, setShowMore] = useState<boolean>(true);
  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div>
      <p className={classes.text} itemProp={itemPropTitle}>
        {showMore ? `${text.slice(0, 250)}...` : text}
      </p>

      <div className={classes.buttonWrapper}>
        <Button color="primary" size="small" onClick={toggleShowMore} className={classes.button}>
          {showMore ? 'Подробнее...' : 'Свернуть'}
        </Button>
      </div>
    </div>
  );
};

export default ReadMore;
