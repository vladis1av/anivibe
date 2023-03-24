import { FC } from 'react';

type CircleProps = {
  color: string;
  begin: number;
  cx: number;
  r?: number
};

const Circle: FC<CircleProps> = ({
  color, begin, cx, r = 15,
}) => (
  <circle fill={color} stroke="none" cx={cx} cy="50" r={r}>
    <animate
      attributeName="opacity"
      dur="1s"
      values="0;1;0"
      repeatCount="indefinite"
      begin={begin} />
  </circle>
);

export default Circle;
