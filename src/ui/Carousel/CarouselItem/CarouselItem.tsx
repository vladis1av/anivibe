import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import useCarouselItemStyles from './CarouselItem.styles';

type CarouselItemProps = {
  children: ReactNode;
  maxWidth?: string;
  isDisabled?: boolean;
};

const CarouselItem: FC<CarouselItemProps> = ({ children, maxWidth, isDisabled }) => {
  const classes = useCarouselItemStyles();

  return <li
    className={
      clsx(
        classes.carouselListItem,
        { [classes.disable]: isDisabled },
      )
    }
    style={{ maxWidth }}
  >
    {children}
  </li>;
};

export default CarouselItem;
