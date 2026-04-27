// https://stackoverflow.com/a/48057286/13995128

import { useState, useCallback, useRef } from 'react';
import type React from 'react';

export type LongPressEvent =
  | React.MouseEvent<HTMLElement>
  | React.TouchEvent<HTMLElement>;

interface LongPressOptions {
  shouldPreventDefault?: boolean;
  delay?: number;
}

const useLongPress = (
  onLongPress: (event: LongPressEvent) => void,
  onClick: (event: LongPressEvent) => void,
  { shouldPreventDefault = true, delay = 300 }: LongPressOptions = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = useRef<(EventTarget & Element) | null>(null);

  const start = useCallback(
    (event: LongPressEvent) => {
      const eventTarget = event.target as EventTarget & Element;
      if (shouldPreventDefault && event.target) {
        eventTarget.addEventListener('touchend', preventDefault as EventListener, {
          passive: false,
        });
        target.current = eventTarget;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: LongPressEvent, shouldTriggerClick = true) => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current);
      }
      shouldTriggerClick &&
        !longPressTriggered &&
        target.current === event.target &&
        onClick(event);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener(
          'touchend',
          preventDefault as EventListener
        );
      }
      target.current = null;
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => start(e),
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => start(e),
    onMouseUp: (e: React.MouseEvent<HTMLElement>) => clear(e),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent<HTMLElement>) => clear(e),
  };
};

const isTouchEvent = (event: Event): event is TouchEvent => {
  return 'touches' in event;
};

const preventDefault = (event: Event): void => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
