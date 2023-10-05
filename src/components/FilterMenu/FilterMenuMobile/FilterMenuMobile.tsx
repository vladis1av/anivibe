import { FC } from 'react';

import Button from '@mui/material/Button';

import Drawer from '@ui/Drawer';

import Filters from '@components/Filters';

import FilterSVG from '@assets/svg/filter';

import useFilterMenuMobileStyles from './FilterMenuMobile.styles';

type FilterMenuMobileProps = {
  drawerIsOpen: boolean;
  onCloseDrawer: () => void;
  onClickMenuButton: () => void;
};

const FilterMenuMobile: FC<FilterMenuMobileProps> = ({
  drawerIsOpen,
  onCloseDrawer,
  onClickMenuButton,
}) => {
  const classes = useFilterMenuMobileStyles();

  return <div className={classes.filterMenuTabletAndBelow}>
    <Button onClick={onClickMenuButton} className={classes.filterMenuButton} variant="text">
      <FilterSVG />
    </Button>

    <Drawer
      isOpen={drawerIsOpen}
      onClose={onCloseDrawer}
      className={classes.filterMenuWrapper}
    >
      <Filters onFiltersAcceptCallback={onCloseDrawer} />
    </Drawer>
  </div>;
};

export default FilterMenuMobile;
