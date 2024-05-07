import React, {
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ButtonSideType, EScrollSideType } from '@interfaces/common';

import { EButtonSide, EScrollSide } from '@enums/enums';

import useCarouselStyles from './Carousel.styles';
import CarouselItem from './CarouselItem';
import Controls from './Controls/Controls';
import ShowMoreLink from './ShowMoreLink';

type UListMouseEvent = MouseEvent<HTMLUListElement>;

type ScrollState = {
  isPressed: boolean;
  isScrolling: boolean;
  clientX: number;
  scrollX: number;
};

type CarouselProps = {
  children: ReactNode;
  showControls?: boolean;
  showMoreLink?: string;
  showMoreLinkQuery?: string;
};

// carousel for any components

const Carousel: FC<CarouselProps> = ({
  children,
  showControls = true,
  showMoreLink,
  showMoreLinkQuery,
}) => {
  const classes = useCarouselStyles();

  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [hiddenButtonSide, setHiddenButtonSide] = useState<ButtonSideType>(EButtonSide.prev);
  const [childMaxWidthWithPx, setChildMaxWidthWithPx] = useState<string | undefined>(undefined);
  const carouselListRef = useRef<HTMLUListElement | null>(null);

  const [{
    isPressed,
    clientX,
    isScrolling,
    scrollX,
  }, setState] = useState<ScrollState>({
    isPressed: false,
    isScrolling: false,
    clientX: 0,
    scrollX: 0,
  });

  const scrollXIsLessZero = (currentScrollX: number): boolean => currentScrollX < 0;
  const getScrollX = (currentClientX: number): number => scrollX - currentClientX + clientX;
  const scrollXIsGreaterSrollWidth = (currentScrollX: number): boolean => currentScrollX > scrollWidth;
  const scrollSideIsLeft = (currentScrollSide: EScrollSideType): boolean => currentScrollSide === EScrollSide.left;

  const setControlsVisible = () => {
    if (carouselListRef.current && showControls) {
      const scrollIsEnd = (carouselListRef.current.offsetWidth + carouselListRef.current.scrollLeft)
           >= carouselListRef.current.scrollWidth;
      const scrollIsStart = !carouselListRef.current.scrollLeft;

      if (scrollIsStart) {
        setHiddenButtonSide(EButtonSide.prev);
      }
      if (scrollIsEnd) {
        setHiddenButtonSide(EButtonSide.next);
      }
      if (!scrollIsEnd && !scrollIsStart) {
        setHiddenButtonSide(null);
      }
    }
  };

  const scrollTo = (scrollValue: number, behavior: 'smooth' | 'auto') => {
    if (carouselListRef.current) {
      carouselListRef.current.scrollTo({
        left: scrollValue,
        behavior,
      });
    }
  };

  const onScrollX = (scrollToValue: number, currentScrollX: number, currentClientX?: number) => {
    if (carouselListRef.current) {
      if (scrollXIsLessZero(currentScrollX)) {
        scrollTo(-scrollWidth, 'smooth');
        setState((prevState) => ({ ...prevState, scrollX: 0, clientX: currentClientX || prevState.clientX }));
        return;
      }

      if (scrollXIsGreaterSrollWidth(currentScrollX)) {
        scrollTo(scrollWidth, 'smooth');
        setState((prevState) => ({ ...prevState, scrollX: scrollWidth, clientX: currentClientX || prevState.clientX }));
        return;
      }

      scrollTo(scrollToValue, 'smooth');
      setState((prevState) => ({
        ...prevState,
        scrollX: currentScrollX,
        clientX: currentClientX || prevState.clientX,
      }));
    }
  };

  const scrollBySide = (scrollSide: EScrollSideType) => () => {
    if (carouselListRef.current && showControls && childMaxWidthWithPx) {
      const scrollElemWidth = Number(childMaxWidthWithPx.slice(0, childMaxWidthWithPx.length - 2)) * 2;
      const currentScrollSideIsLeft = scrollSideIsLeft(scrollSide);
      const valueToScroll = currentScrollSideIsLeft ? -scrollElemWidth : scrollElemWidth;
      const sXValue = currentScrollSideIsLeft
        ? Math.round(scrollX - scrollElemWidth)
        : Math.round(scrollX + scrollElemWidth);
      onScrollX(valueToScroll + carouselListRef.current.scrollLeft, sXValue);
    }
  };

  const setCarouselTranslate = (translateValue: number) => {
    if (!carouselListRef.current) return;
    carouselListRef.current.style.transform = `translate(${(translateValue)}%)`;
  };

  const getCarouselTranslateBounce = (
    currentX: number,
    isStartScrollBounce?: boolean,
  ) => {
    const bounce = currentX / 100;
    return isStartScrollBounce ? bounce : -bounce;
  };

  const onMouseMove = (e: UListMouseEvent) => {
    e.preventDefault();
    if (!carouselListRef.current) return;

    if (isPressed) {
      const sX = getScrollX(e.clientX);
      const x = e.pageX - carouselListRef.current.offsetLeft;

      if (scrollXIsLessZero(sX)) {
        setCarouselTranslate(getCarouselTranslateBounce(x, true));
        return;
      }

      if (scrollXIsGreaterSrollWidth(sX)) {
        setCarouselTranslate(getCarouselTranslateBounce(x));
        return;
      }

      carouselListRef.current.scrollLeft = sX;
      setState((prevState) => ({
        ...prevState, scrollX: sX, clientX: e.clientX, isScrolling: true,
      }));
    }
  };

  // const onWheel = (e: WheelEvent<HTMLUListElement>) => {
  //   if (carouselListRef.current) {
  //     const { deltaY } = e;
  //     const wheelValue = carouselListRef.current.scrollLeft + deltaY * 1.5;
  //     const scrollXWidth = deltaY > 0 ? scrollX + wheelValue : scrollX - wheelValue;

  //     onScrollX(wheelValue, scrollXWidth, e.clientX);
  //   }
  // };

  const onMouseDown = (e: UListMouseEvent) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      isPressed: true,
      clientX: e.clientX,
    }));
  };

  const onMouseUp = (e: UListMouseEvent) => {
    e.preventDefault();
    if (!carouselListRef.current) return;
    setState((prevState) => ({
      ...prevState, isPressed: false, clientX: 0, isScrolling: false,
    }));
    setCarouselTranslate(0);
  };

  useEffect(() => {
    if (carouselListRef.current) {
      setScrollWidth(carouselListRef.current.scrollWidth - carouselListRef.current.clientWidth);

      if (!childMaxWidthWithPx) {
        const firstElement = carouselListRef.current.firstElementChild?.firstElementChild;

        if (firstElement) {
          setChildMaxWidthWithPx(getComputedStyle(firstElement).width);
        }
      }

      carouselListRef.current.addEventListener('scroll', setControlsVisible);
    }

    return () => {
      if (carouselListRef.current) {
        carouselListRef.current.removeEventListener('scroll', setControlsVisible);

        carouselListRef.current = null;
      }
    };
  }, [carouselListRef]);

  return (
    <div className={classes.carousel}>
      <ul
        // onWheel={onWheel}
        onMouseUp={onMouseUp}
        ref={carouselListRef}
        onMouseLeave={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        className={classes.carouselList}
      >
        {React.Children.map(children, (child) => <CarouselItem isDisabled={isScrolling}>
          {child}
        </CarouselItem>)}

        {
          showMoreLink && <CarouselItem isDisabled={isScrolling} className={classes.showMoreItem}>
            <ShowMoreLink link={showMoreLink} query={showMoreLinkQuery}/>
          </CarouselItem>
        }
      </ul>

      <Controls
        showControls={showControls}
        buttonSide={hiddenButtonSide}
        onNext={scrollBySide(EScrollSide.right)}
        onBack={scrollBySide(EScrollSide.left)}
      />
    </div>
  );
};

export default Carousel;
