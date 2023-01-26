import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

function useOnClickOutside<T>(ref: RefObject<T>, handler:((evt?: Event) => void)) {
  useEffect(
    () => {
      const listener = (event: Event) => {
        // @ts-ignore
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler],
  );
}

export default useOnClickOutside;
