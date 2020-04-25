import throttle from "lodash/throttle";
import { useEffect, useLayoutEffect, useRef } from "react";

const isBrowser = typeof window !== undefined && typeof document !== undefined;

export function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: Math.abs(window.scrollX), y: Math.abs(window.scrollY) }
    : { x: Math.abs(position.left), y: Math.abs(position.top) };
}

export function getScrollDimensions({ element }) {
  if (!isBrowser) return { width: 0, height: 0 };

  const target = element ? element.current : document.body;

  return {
    width: target.scrollWidth - window.innerWidth,
    height: target.scrollHeight - window.innerHeight,
  };
}

export function useScrollPosition(effect, deps, element, useWindow, wait = 16) {
  const position = useRef({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const handleScroll = throttle(() => {
      const currPos = getScrollPosition({ element, useWindow });
      const currDimensions = getScrollDimensions({ element });
      const progress = {
        x: currPos.x / currDimensions.width,
        y: currPos.y / currDimensions.height,
      };
      effect({
        prevX: position.current.x,
        prevY: position.current.y,
        x: currPos.x,
        y: currPos.y,
        progress,
        max: currDimensions,
      });
      position.current = {
        x: currPos.x,
        y: currPos.y,
      };
    }, wait);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, deps);
}
