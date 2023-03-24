import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const WatchSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 30,
  height = 30,
  className,
}) => (
  <svg
    width={width}
    height={height}
    fill={fill}
    className={className}
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    clipRule="evenodd"
    viewBox="0 0 24 24"
  >
    <path d="M8.348 4.023A2.75 2.75 0 004.25 6.42v11.16a2.749 2.749 0 004.098 2.397l9.921-5.58a2.75
     2.75 0 000-4.794l-9.921-5.58zM7.613 5.33l9.92 5.581a1.248 1.248 0 010 2.178l-9.92
      5.581a1.25 1.25 0 01-1.863-1.09V6.42a1.25 1.25 0 011.863-1.09z"></path>
  </svg>
);

export default WatchSVG;
