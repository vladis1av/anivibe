import { FC } from 'react';

import Link from '@ui/Link';

import LongArrowSVG from '@assets/svg/longArrow';

import ShowMoreLinkStyles from './ShowMoreLink.styles';

type ShowMoreLinkProps = {
  link: string;
  query?: string;
};

const ShowMoreLink: FC<ShowMoreLinkProps> = ({ link, query }) => {
  const classes = ShowMoreLinkStyles();

  return <Link path={link} className={classes.showMoreLink} query={query}>
    <span className={classes.showMoreLinkIconWrapper}>
      <LongArrowSVG />
    </span>

    <p className={classes.showMoreLinkText}>Показать все</p>
  </Link>;
};

export default ShowMoreLink;
