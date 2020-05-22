import { useEffect, useRef } from "react";

export type IntervalCallback = VoidFunction;

const useInterval = (callback: IntervalCallback, delay?: number) => {
  const savedCallback = useRef<IntervalCallback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
