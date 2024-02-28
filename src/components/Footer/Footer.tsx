import { FC } from 'react';

import { ELinkPath } from '@enums/enums';

import Link from '@ui/Link';

import useFooterStyles from './Footer.styles';

const Footer: FC = () => {
  const classes = useFooterStyles();

  return (
    <footer className={classes.footer} >
      <div className={classes.footerContainer}>
        <div className={classes.footerInfoWrapper}>
          <div className={classes.age}>18+</div>

          <Link path={ELinkPath.home} className={classes.homeLink}>
            <span className={classes.corp}>{'© anivibe'}</span>
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
