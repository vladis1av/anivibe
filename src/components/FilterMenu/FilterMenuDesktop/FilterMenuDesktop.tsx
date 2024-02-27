import { FC } from 'react';

import Filters from '@components/Filters';

import useHeaderContext from '@hooks/useHeaderContext';

import useFilterMenuDesktopStyles from './FilterMenuDesktop.styles';

type FilterMenuDesktopProps = {
  onFiltersAccept?: (page?: number, cleanParams?: boolean) => void;
};

const FilterMenuDesktop: FC<FilterMenuDesktopProps> = ({ onFiltersAccept }) => {
  const headerHeight = useHeaderContext();
  const classes = useFilterMenuDesktopStyles(headerHeight)();

  return (
    <aside className={classes.filterMenuDesktop}>
      <Filters onFiltersAccept={onFiltersAccept}/>
    </aside>
  );
};

export default FilterMenuDesktop;
