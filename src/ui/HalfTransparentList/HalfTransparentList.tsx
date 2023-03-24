import {
  FC, ReactNode,
} from 'react';

import clsx from 'clsx';

import HalfTransparentListItem from '@ui/HalfTransparentListItem';

import ArrowSVG from '@assets/svg/arrow';

import useHalfTransparentListStyles from './HalfTransparentList.styles';

type HalfTransparentListProps = {
  backTitle?: string | null;
  onBack?: () => void;
  className?: string;
  children: ReactNode;
};

const HalfTransparentList: FC<HalfTransparentListProps> = ({
  backTitle,
  onBack,
  className,
  children,
}) => {
  const classes = useHalfTransparentListStyles();

  return (
    <div className={clsx(classes.halfTransparentList, className)}>
      {
        onBack && backTitle ? <HalfTransparentListItem
          className={classes.halfTransparentListItemHeader}
          isDisabled
          onClick={onBack}
        >
          <ArrowSVG width={14} className={classes.halfTransparentListItemHeaderSvg}/>

          <div className={classes.halfTransparentListItemHeaderDivider} />

          <span className={classes.halfTransparentListItemHeaderBack}>{backTitle}</span>
        </HalfTransparentListItem> : null
      }

      {children}
    </div>
  );
};

export default HalfTransparentList;
