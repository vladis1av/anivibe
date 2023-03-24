import { useEffect } from 'react';

type MouseIsNotActiveProps = {
  watchers: Array<any>,
  conditionOnStart: boolean;
  maxInactivitySeconds: number;
  activityEvents: Array<string>
  onActive?: () => void;
  onInactive?: () => void;
};

const useCheckUserActivity = ({
  watchers,
  conditionOnStart,
  maxInactivitySeconds,
  activityEvents,
  onActive,
  onInactive,
}: MouseIsNotActiveProps) => {
  let secondsSinceLastActivity: number = 0;
  let interval: ReturnType<typeof setInterval> | null = null;

  const showCursor = () => {
    document.body.style.cursor = 'default';

    if (onActive) {
      onActive();
    }
  };

  const hideCursor = () => {
    document.body.style.cursor = 'none';

    if (onInactive) {
      onInactive();
    }
  };

  const setActive = () => {
    secondsSinceLastActivity = 0;
    showCursor();
  };

  const activityWatcher = () => {
    secondsSinceLastActivity = 0;

    interval = setInterval(() => {
      secondsSinceLastActivity++;

      if (secondsSinceLastActivity >= maxInactivitySeconds && conditionOnStart) {
        hideCursor();
      }
    }, 1000);
  };

  const clearIntervalById = () => {
    if (interval) {
      clearInterval(interval);
    }
  };

  useEffect(() => {
    activityEvents.forEach((eventName) => {
      document.addEventListener(eventName, setActive, true);
    });

    clearIntervalById();
    activityWatcher();

    return () => {
      activityEvents.forEach((eventName) => {
        document.removeEventListener(eventName, setActive, true);
      });

      clearIntervalById();
    };
  }, [activityEvents, conditionOnStart, ...watchers]);
};

export default useCheckUserActivity;
