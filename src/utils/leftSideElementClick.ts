import { MouseEvent } from 'react';

const leftSideElementClick = (e: MouseEvent<HTMLElement>, onLeft: () => void, onRight: () => void) => {
  const { currentTarget } = e;
  const clickTargetWidth = currentTarget.offsetWidth;
  const xCoordInClickTarget = e.clientX - currentTarget.getBoundingClientRect().left;

  if (clickTargetWidth / 2 > xCoordInClickTarget) {
    onLeft();
    return;
  }

  onRight();
};

export default leftSideElementClick;
