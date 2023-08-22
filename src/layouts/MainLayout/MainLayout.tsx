import { ReactNode, FC } from 'react';

import clsx from 'clsx';
import NextNProgress from 'nextjs-progressbar';

import {
  NEXT_N_PROGGRESS_COLOR,
  NEXT_N_PROGGRESS_START_POSITION,
  NEXT_N_PROGGRESS_STOP_DELAY_MS,
  NEXT_N_PROGGRESS_HEIGHT,
} from '@constants/nextNproggress';

import { getOverlay } from '@redux/slices/overlay';

import Overlay from '@ui/Overlay';

import Header from '@components/Header';

import useAppSelector from '@hooks/useAppSelector';

import useMainLayoutStyles from './MainLayout.styles';

type MainLayoutProps = {
  children: ReactNode;
  className?: string;
  full?: boolean;
  fullHeight?: boolean;
  paddings?: boolean;
  clearPaddingTop?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  className,
  full,
  fullHeight,
  paddings,
  clearPaddingTop,
}) => {
  const classes = useMainLayoutStyles();
  const overlayIsOpen = useAppSelector(getOverlay);

  return (
    <>
      <Overlay overlayIsOpen={overlayIsOpen} />

      <Header />

      <NextNProgress
        color={NEXT_N_PROGGRESS_COLOR}
        startPosition={NEXT_N_PROGGRESS_START_POSITION}
        height={NEXT_N_PROGGRESS_HEIGHT}
        stopDelayMs={NEXT_N_PROGGRESS_STOP_DELAY_MS}
        options={{ showSpinner: false }}
      />

      <div className={clsx(classes.wrapper, className, {
        [classes.full]: full,
        [classes.fullHeight]: fullHeight,
        [classes.paddings]: paddings,
        [classes.clearPaddingTop]: clearPaddingTop,
      })}>
        {children}
      </div>
    </>
  );
};

export default MainLayout;
