import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const MenuSVG: FC<SvgIconProps> = ({
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
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
  </svg>
);

export default MenuSVG;
