import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Button from '@mui/material/Button';
import clsx from 'clsx';

import { ButtonSideType, EScrollSideType } from '@interfaces/common';

import { EButtonSide, EScrollSide } from '@enums/enums';

import { CAROUSEL_ARROW_SVG_SIZE } from '@constants/common';

import ArrowSVG from '@assets/svg/arrow';

import useCarouselStyles from './Carousel.styles';
import CarouselItem from './CarouselItem';
import ShowMoreLink from './ShowMoreLink';

type CarouselProps = {
  children: ReactNode;
  showControls?: boolean;
  showMoreLink?: string;
  childMaxWidth?: number;
};

const Carousel: FC<CarouselProps> = ({
  children,
  showControls = true,
  showMoreLink,
  childMaxWidth,
}) => {
  const classes = useCarouselStyles();
  const currentChildWidth = childMaxWidth ? `${childMaxWidth}px` : undefined;
  const [buttonIsHidden, setButtonIsHidden] = useState<ButtonSideType>(EButtonSide.prev);
  const [childMaxWidthWithPx, setChildMaxWidthWithPx] = useState<string | undefined>(currentChildWidth);

  const carouselListRef = useRef<HTMLUListElement | null>(null);

  const getButtonHiddenStyle = (condition: ButtonSideType) => (buttonIsHidden === condition ? classes.hideButton : '');

  const scrollTo = (scrollSide: EScrollSideType) => () => {
    if (carouselListRef.current && showControls && childMaxWidthWithPx) {
      const scrollWidth = Number(childMaxWidthWithPx.slice(0, childMaxWidthWithPx.length - 2)) * 2;
      const valueToScroll = scrollSide === EScrollSide.right ? scrollWidth : -scrollWidth;

      carouselListRef.current.scrollBy({
        left: valueToScroll,
        behavior: 'smooth',
      });
    }
  };

  const hideButton = (condition: boolean, buttonSide: ButtonSideType) => {
    if (condition) {
      setButtonIsHidden(buttonSide);
    }
  };

  const setControlsVisible = useCallback(() => {
    const currentRef = carouselListRef.current;
    if (showControls && currentRef) {
      const scrollIsEnd = (currentRef.offsetWidth + currentRef.scrollLeft)
           >= currentRef.scrollWidth;
      const scrollIsStart = !currentRef.scrollLeft;

      hideButton(scrollIsStart, EButtonSide.prev);
      hideButton(scrollIsEnd, EButtonSide.next);
      hideButton(!scrollIsEnd && !scrollIsStart, null);
    }
  }, []);

  useEffect(() => {
    if (carouselListRef.current) {
      const elment = carouselListRef.current?.firstElementChild?.firstElementChild;

      if (elment && !childMaxWidthWithPx) {
        setChildMaxWidthWithPx(getComputedStyle(elment).width);
      }

      carouselListRef.current.addEventListener('scroll', setControlsVisible);
    }

    return () => {
      if (carouselListRef.current) {
        carouselListRef.current.removeEventListener('scroll', setControlsVisible);
        carouselListRef.current = null;
      }
    };
  }, []);

  return (
    <div className={classes.carousel}>
      <ul className={classes.carouselList} ref={carouselListRef}>
        {React.Children.map(children, (child) => <CarouselItem maxWidth={childMaxWidthWithPx}>
          {child}
        </CarouselItem>)}

        {
          showMoreLink && <CarouselItem maxWidth={childMaxWidthWithPx}>
            <ShowMoreLink link={showMoreLink}/>
          </CarouselItem>
        }
      </ul>

      <Button
        onClick={scrollTo(EScrollSide.left)}
        variant="text"
        className={clsx(classes.button, classes.buttonPrev, getButtonHiddenStyle(EButtonSide.prev))}
      >
        <ArrowSVG {...CAROUSEL_ARROW_SVG_SIZE}/>
      </Button>

      <Button
        onClick={scrollTo(EScrollSide.right)}
        variant="text"
        className={clsx(classes.button, classes.buttonNext, getButtonHiddenStyle(EButtonSide.next))}
      >
        <ArrowSVG className={classes.nextSvg} {...CAROUSEL_ARROW_SVG_SIZE} />
      </Button>
    </div>
  );
};

export default Carousel;
