import { FC, useCallback, useState } from 'react';

import dynamic from 'next/dynamic';

type FilterMenuProps = {
  isDesktopOrBelow: boolean;
};

const FilterMenuDesktop = dynamic(() => import('@components/FilterMenu/FilterMenuDesktop'));
const FilterMenuMobile = dynamic(() => import('@components/FilterMenu/FilterMenuMobile'));

const FilterMenu: FC<FilterMenuProps> = ({
  isDesktopOrBelow,
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
        onClickMenuButton={onToggleDrawer} />;
    }
    return <FilterMenuDesktop />;
  };

  return getFilterMenu(isDesktopOrBelow);
};

export default FilterMenu;
