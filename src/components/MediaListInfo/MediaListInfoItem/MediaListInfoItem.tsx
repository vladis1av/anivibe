import { FC } from 'react';

import useMediaListInfoItemStyles from './MediaListInfoItem.styles';

type MediaListInfoItemProps = {
  value?: string | number;
};

const MediaListInfoItem: FC<MediaListInfoItemProps> = ({ value }) => {
  const classes = useMediaListInfoItemStyles();
  if (value) {
    return <span className={classes.text}>{value}</span>;
  }
  return null;
};

export default MediaListInfoItem;
