import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const AppSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 25,
  height = 25,
  className,
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
  </svg>
);

export default AppSVG;
