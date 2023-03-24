import { FC } from 'react';

import clsx from 'clsx';

import { EColor } from '@enums/enums';

import { CIRCLES } from '@constants/common';

import Circle from './Circle';
import useLoaderStyles from './Loader.styles';

type LoaderProps = {
  color?: string;
  isLoading: boolean;
  className: string;
};

const Loader: FC<LoaderProps> = ({ color = EColor.white, isLoading, className }) => {
  const classes = useLoaderStyles();

  if (!isLoading) {
    return null;
  }

  return (
    <div className={clsx(classes.loader, className)}>
      <svg
        x="0px"
        y="0px"
        width={55}
        height={30}
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        xmlSpace="preserve"
      >
        {
          CIRCLES.map(({ cx, begin }, i) => <Circle key={i} color={color} cx={cx} begin={begin} />)
        }
      </svg>
    </div>
  );
};

export default Loader;
