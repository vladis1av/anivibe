import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import useHalfTransparentListItemStyles from './HalfTransparentListItem.styles';

type HalfTransparentListItemProps = {
  children: ReactNode;
  isDisabled?: boolean;
  paddingOff?: boolean;
  onClick?: () => void;
  className?: string;
};

const HalfTransparentListItem: FC<HalfTransparentListItemProps> = ({
  isDisabled,
  paddingOff,
  children,
  onClick,
  className,
}) => {
  const classes = useHalfTransparentListItemStyles();

  return (
    <div
      onClick={onClick}
      className={
        clsx(
          classes.halfTransparentListItem,
          {
            [classes.halfTransparentListItemDisabled]: isDisabled,
            [classes.halfTransparentListItemPaddingOff]: paddingOff,
          },
          className,
        )}>
      {children}
    </div>
  );
};

export default HalfTransparentListItem;
