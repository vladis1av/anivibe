import { FC } from 'react';

import Filters from '@components/Filters';

import useFilterMenuDesktopStyles from './FilterMenuDesktop.styles';

const FilterMenuDesktop: FC = () => {
  const classes = useFilterMenuDesktopStyles();

  return <aside className={classes.filterMenuDesktop}>
    <Filters />
  </aside>;
};

export default FilterMenuDesktop;
