import { EMainRouteType } from '@interfaces/common';

import { ERouteName } from '@enums/enums';

import BookSVG from '@assets/svg/book';
import HomepSVG from '@assets/svg/home';
import WatchSVG from '@assets/svg/watch';

const getRouteIcon = (iconName: (EMainRouteType) | string) => {
  switch (iconName) {
    case ERouteName.home:
      return <HomepSVG />;
    case ERouteName.animes:
      return <WatchSVG />;
    case ERouteName.mangas:
      return <BookSVG />;
    default:
      return iconName;
  }
};

export default getRouteIcon;
