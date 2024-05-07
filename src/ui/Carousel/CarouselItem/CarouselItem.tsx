import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import useCarouselItemStyles from './CarouselItem.styles';

type CarouselItemProps = {
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
};

const CarouselItem: FC<CarouselItemProps> = ({ children, isDisabled, className }) => {
  const classes = useCarouselItemStyles();

  return <li
    className={
      clsx(
        classes.carouselListItem,
        { [classes.disable]: isDisabled },
        className,
      )
    }
  >
    {children}
  </li>;
};

export default CarouselItem;
