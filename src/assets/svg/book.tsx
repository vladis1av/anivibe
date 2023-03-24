import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const BookSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 30,
  height = 30,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    strokeWidth={1.2}
    viewBox="0 0 21 21"
  >
    <g
      fill="none"
      fillRule="evenodd"
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 3.5h8a2 2 0 012 2v10a2 2 0 01-2 2h-8a2 2 0 01-2-2v-10a2 2 0 012-2z"></path>
      <path d="M7.5 3.5h4v5.012L9.5 6.5l-2 2.012z"></path>
    </g>
  </svg>
);

export default BookSVG;
