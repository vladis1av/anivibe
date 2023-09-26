import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const FilterSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 24,
  height = 24,
  className,
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={className}
  >
    <path fillRule="evenodd" d="M6.24 8.9a2.9 2.9 0 0 0 5.52 0H20a.9.9 0 1 0
     0-1.8h-8.24a2.9 2.9 0 0 0-5.52 0H4a.9.9 0 1 0 0 1.8h2.24ZM9 6.9a1.1 1.1
      0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM3.1 16a.9.9 0 0 1 .9-.9h8.24a2.9 2.9 0
       0 1 5.52 0H20a.9.9 0 1 1 0 1.8h-2.24a2.9 2.9 0 0 1-5.52 0H4a.9.9 0 0
       1-.9-.9Zm10.8 0a1.1 1.1 0 1 1 2.2 0 1.1 1.1 0 0 1-2.2 0Z" clipRule="evenodd">
    </path>
  </svg>
);

export default FilterSVG;
