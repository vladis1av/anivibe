import { FC } from 'react';

import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import usePageDescriptionStyles from './PageDescription.styles';

type PageDescriptionProps = {
  title: string;
  description: string;
  className?: string;
};

const PageDescription: FC<PageDescriptionProps> = ({ title, description, className }) => {
  const classes = usePageDescriptionStyles();

  return (
    <header className={clsx(classes.pageDescriptionWrapper, className)}>
      <Typography className={classes.title} variant="h1">
        {title}
      </Typography>

      <p className={classes.description}>
        {description}
      </p>
    </header>
  );
};

export default PageDescription;
