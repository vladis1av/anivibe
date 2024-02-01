import { FC } from 'react';

import Filters from '@components/Filters';

import useHeaderContext from '@hooks/useHeaderContext';

import useFilterMenuDesktopStyles from './FilterMenuDesktop.styles';

const FilterMenuDesktop: FC = () => {
  const headerHeight = useHeaderContext();
  const classes = useFilterMenuDesktopStyles(headerHeight);

  return (
    <aside className={classes.filterMenuDesktop}>
      <Filters />
    </aside>
  );
};

export default FilterMenuDesktop;
