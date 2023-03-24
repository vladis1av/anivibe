import { FC, ReactNode } from 'react';

import useCarouselItemStyles from './CarouselItem.styles';

type CarouselItemProps = {
  children: ReactNode;
  maxWidth?: string;
};

const CarouselItem: FC<CarouselItemProps> = ({ children, maxWidth }) => {
  const classes = useCarouselItemStyles();

  return <li className={classes.carouselListItem} style={{ maxWidth }}>{children}</li>;
};

export default CarouselItem;
