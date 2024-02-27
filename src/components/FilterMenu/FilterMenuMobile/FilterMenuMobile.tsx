import { FC } from 'react';

import Button from '@mui/material/Button';

import Drawer from '@ui/Drawer';

import Filters from '@components/Filters';

import FilterSVG from '@assets/svg/filter';

import useHeaderContext from '@hooks/useHeaderContext';

import useFilterMenuMobileStyles from './FilterMenuMobile.styles';

type FilterMenuMobileProps = {
  drawerIsOpen: boolean;
  onOpenDrawer: () => void;
  onCloseDrawer: () => void;
  onFiltersAccept?: (page?: number, cleanParams?: boolean) => void;
};

const FilterMenuMobile: FC<FilterMenuMobileProps> = ({
  drawerIsOpen,
  onOpenDrawer,
  onCloseDrawer,
  onFiltersAccept,
}) => {
  const headerHeight = useHeaderContext();
  const classes = useFilterMenuMobileStyles(headerHeight)();

  const onFilterAccept = () => {
    if (onFiltersAccept) {
      onFiltersAccept();
    }
    onCloseDrawer();
  };

  return <aside className={classes.filterMenuTabletAndBelow}>
    <Button
      onClick={onOpenDrawer}
      className={classes.filterMenuButton}
      variant="text"
    >
      <FilterSVG />
    </Button>

    <Drawer
      isOpen={drawerIsOpen}
      onClose={onCloseDrawer}
      className={classes.filterMenuWrapper}
    >
      <Filters onFiltersAccept={onFilterAccept} />
    </Drawer>
  </aside>;
};

export default FilterMenuMobile;
