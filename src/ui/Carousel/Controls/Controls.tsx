import { FC } from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx';

import { ButtonSideType } from '@interfaces/common';

import { EButtonSide } from '@enums/enums';

import ArrowSVG from '@assets/svg/arrow';

import ControlsStyles from './Controls.styles';

type ControlsProps = {
  showControls?: boolean;
  buttonSide: ButtonSideType;
  onNext: () => void;
  onBack: () => void;
};

const Controls: FC<ControlsProps> = ({
  showControls, buttonSide, onNext, onBack,
}) => {
  const classes = ControlsStyles();

  const getButtonHiddenStyle = (
    currentButtonSide: ButtonSideType,
  ) => (buttonSide === currentButtonSide ? classes.hideButton : '');

  if (!showControls) {
    return null;
  }

  return <>
    <Button
      variant="text"
      onClick={onBack}
      className={clsx(classes.button, classes.buttonPrev, getButtonHiddenStyle(EButtonSide.prev))}
    >
      <ArrowSVG className={classes.svg} />
    </Button>

    <Button
      variant="text"
      onClick={onNext}
      className={clsx(classes.button, classes.buttonNext, getButtonHiddenStyle(EButtonSide.next))}
    >
      <ArrowSVG className={clsx(classes.buttonNextSvg, classes.svg)} />
    </Button>
  </>;
};

export default Controls;
