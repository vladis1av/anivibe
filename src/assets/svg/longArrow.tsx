import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const LongArrowSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 18.41,
  height = 18,
  className,
}) => (<svg
  width={width}
  height={height}
  className={className}
  viewBox="0 0 18.42 18"
>
  <path
    fill={fill}
    fillRule="evenodd"
    d="M14.589 10H0V8h14.587L8 1.416 9.414 0l9.005 9.001L9.413 18 8 16.584 14.589 10z"
  ></path>
</svg>);

export default LongArrowSVG;
