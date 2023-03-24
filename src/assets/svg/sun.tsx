import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const SunSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 26,
  height = 26,
  className,
}) => (
  <svg
    fill="transparent"
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.5 17.5L19 19m1-7h2M6.5 6.5L5 5m12.5 1.5L19 5M6.5
       17.5L5 19m-3-7h2m8-10v2m0 16v2m4-10a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
);

export default SunSVG;
