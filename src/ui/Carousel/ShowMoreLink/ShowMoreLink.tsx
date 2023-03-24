import { FC, memo } from 'react';

import Link from '@ui/Link';

import LongArrowSVG from '@assets/svg/longArrow';

import ShowMoreLinkStyles from './ShowMoreLink.styles';

type ShowMoreLinkProps = {
  link: string;
};

const ShowMoreLink: FC<ShowMoreLinkProps> = ({ link }) => {
  const classes = ShowMoreLinkStyles();

  return <Link path={link} className={classes.showMoreLink}>
    <span className={classes.showMoreLinkIconWrapper}>
      <LongArrowSVG />
    </span>

    <p className={classes.showMoreLinkText}>Показать все</p>
  </Link>;
};

export default memo(ShowMoreLink);
