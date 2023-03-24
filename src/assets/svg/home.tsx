import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const HomepSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 27,
  height = 27,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 21 21"
    strokeWidth={1.5}
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M.5 9.5l9-9 9 9" transform="translate(1 1)"></path>
      <path
        d="M2.5 7.5v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        transform="translate(1 1)"
      ></path>
    </g>
  </svg>
);

export default HomepSVG;
