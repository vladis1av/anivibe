import { useState } from 'react';
import { Button } from '@material-ui/core';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <span style={{ color: '#9E9E9E' }}>
      {isReadMore ? text.slice(0, 250) : text}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="primary" size="small" onClick={toggleReadMore}>
          {isReadMore ? 'Прочитать дальше' : 'Скрыть'}
        </Button>
      </div>
    </span>
  );
};

export default ReadMore;
