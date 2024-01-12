import { FC } from 'react';

import Link from '@ui/Link';

import useChipStyles from './Chip.styles';

type ChipProps = {
  title: string;
  linkPath: string;
  query: string;
};

const Chip: FC<ChipProps> = ({ title, linkPath, query }) => {
  const classes = useChipStyles();

  return (
    <Link
      path={linkPath}
      query={query}
      className={classes.link}
    >{title}
    </Link>
  );
};

export default Chip;
