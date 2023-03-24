import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const ArrowSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 20,
  height = 20,
  className,
}) => (
  <svg
    fill="none"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 12 16"
  >
    <path
      fill={fill}
      d="M4.773 8l3.363 3.364a.9.9 0 11-1.272 1.272l-4-4a.9.9 0 010-1.272l4-4a.9.9 0 111.272 1.272z"
    ></path>
  </svg>
);

export default ArrowSVG;
