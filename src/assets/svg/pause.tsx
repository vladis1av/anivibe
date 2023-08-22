import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const PauseSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 25,
  height = 25,
  className,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    fill={fill}
    viewBox="0 0 256 256">
    <path fill="none" d="M0 0H256V256H0z"></path>
    <path d="M216 48v160a16 16 0 01-16 16h-36a16 16 0 01-16-16V48a16 16 0
    0116-16h36a16 16 0 0116 16zM92 32H56a16 16 0 00-16 16v160a16 16 0 0016 16h36a16
    16 0 0016-16V48a16 16 0 00-16-16z"></path>
  </svg>
);

export default PauseSVG;
