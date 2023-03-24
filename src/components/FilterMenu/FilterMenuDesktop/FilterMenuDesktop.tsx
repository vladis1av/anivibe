import { FC } from 'react';

import Filters from '@components/Filters';

import useFilterMenuDesktopStyles from './FilterMenuDesktop.styles';

const filterMenuDesktop: FC = () => {
  const classes = useFilterMenuDesktopStyles();

  return <aside className={classes.filterMenuDesktop}>
    <Filters className={classes.filters}/>
  </aside>;
};

export default filterMenuDesktop;
