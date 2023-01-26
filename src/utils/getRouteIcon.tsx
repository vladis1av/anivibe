import { MainRoutes } from '@interfaces/common';

import { ERouteName } from '@enums/enums';

import BookSVG from '@static/svg/book';
import HomepSVG from '@static/svg/home';
import WatchSVG from '@static/svg/watch';

const getRouteIcon = (iconName: (MainRoutes) | string) => {
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
