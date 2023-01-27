import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const ArrowSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 25,
  height = 25,
  className,
}) => (
  <svg
    fill="none"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 17 36"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M5.5 18L16.6 3.2 13.4.8.5 18l12.9 17.2 3.2-2.4L5.5 18z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export default ArrowSVG;
