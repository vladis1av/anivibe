import { FC } from 'react';

import { useRouter } from 'next/router';

import clsx from 'clsx';

import { ELinkPath, ERouteName } from '@enums/enums';

import { MAIN_ROUTES_MENU } from '@constants/common';

import Link from '@ui/Link';

import getRouteIcon from '@utils/getRouteIcon';
import entries from '@utils/object/entries';
import getOnlyText from '@utils/regexp/getOnlyText';

import useCommonStyles from '@styles/Common.styles';

import useNavigationStyles from './Navigation.styles';

type NavigationProps = {

};

const Navigation: FC<NavigationProps> = () => {
  const classes = useNavigationStyles();
  const commonClasses = useCommonStyles();
  const { asPath } = useRouter();
  const currentRoute = getOnlyText(asPath) || ERouteName.home;

  return (
    <nav className={classes.nav}>
      {
        entries(MAIN_ROUTES_MENU).map(([key, value]) => {
          const { title } = value;
          return (
            <Link
              path={ELinkPath[key]}
              key={key}
              attributeTitle={title}
              className={clsx(classes.navLink, { [classes.activeNavLink]: key === currentRoute })}
            >
              <span className={commonClasses.displayHide}>{title}</span>
              {getRouteIcon(key)}
            </Link>
          );
        })
      }
    </nav>
  );
};

export default Navigation;
