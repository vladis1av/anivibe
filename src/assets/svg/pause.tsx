import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const PauseSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 25,
  height = 25,
  className,
}) => (

  <svg
    width={width}
    height={height}
    className={className}
    fill={fill}
    viewBox="0 0 16 16"
  >
    <path d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5zm5 0A1.5 1.5 0
     0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5z"></path>
  </svg>
);

export default PauseSVG;
