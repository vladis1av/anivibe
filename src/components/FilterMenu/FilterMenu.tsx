import { FC, useCallback, useState } from 'react';

import dynamic from 'next/dynamic';

type FilterMenuProps = {
  isDesktopOrBelow: boolean;
  onFiltersAccept?: (page?: number, cleanParams?: boolean) => void;
};

const FilterMenuDesktop = dynamic(() => import('@components/FilterMenu/FilterMenuDesktop'));
const FilterMenuMobile = dynamic(() => import('@components/FilterMenu/FilterMenuMobile'));

const FilterMenu: FC<FilterMenuProps> = ({
  isDesktopOrBelow,
  onFiltersAccept,
}) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const onCloseDrawer = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);

  const onToggleDrawer = () => setDrawerIsOpen((prevState) => !prevState);

  const getFilterMenu = (isMobile: boolean) => {
    if (isMobile) {
      return <FilterMenuMobile
        drawerIsOpen={drawerIsOpen}
        onCloseDrawer={onCloseDrawer}
        onFiltersAccept={onFiltersAccept}
        onOpenDrawer={onToggleDrawer}
      />;
    }
    return <FilterMenuDesktop onFiltersAccept={onFiltersAccept} />;
  };

  return getFilterMenu(isDesktopOrBelow);
};

export default FilterMenu;
