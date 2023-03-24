import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const PlaybackSpeedSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 23,
  height = 23,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
      <g>
        <path d="M0 0L24 0 24 24 0 24z"></path>
        <path
          fill={fill}
          fillRule="nonzero"
          d="M11 4.07V2.05c-2.01.2-3.84 1-5.32 2.21L7.1 5.69A7.941 7.941 0 0111 4.07zM5.69 7.1L4.26 5.68A9.949 9.949
           0 002.05 11h2.02c.18-1.46.76-2.79 1.62-3.9zM2.05 13c.2 2.01 1 3.84 2.21 5.32l1.43-1.43A7.868 7.868 0 014.07
            13H2.05zM11 21.95v-2.02a7.941 7.941 0 01-3.9-1.62l-1.42 1.43A9.981 9.981 0 0011 21.95zM22 12c0 5.16-3.92
             9.42-8.95 9.95v-2.02C16.97 19.41 20 16.05 20 12s-3.03-7.41-6.95-7.93V2.05C18.08 2.58 22 6.84
              22 12zM10.688 8.576l4.746 2.736a.792.792 0 010 1.372l-4.746 2.737a.792.792
               0 01-1.188-.686V9.262a.792.792 0 011.188-.686z"
        ></path>
      </g>
    </g>
  </svg>
);

export default PlaybackSpeedSVG;
