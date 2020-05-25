import throttle from "lodash/throttle";
import { useLayoutEffect, useRef } from "react";
import { isBrowser } from "./browser";

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface ScrollDimensions {
  width: number;
  height: number;
}

export interface ScrollEffectProps {
  prev: ScrollPosition;
  curr: ScrollPosition;
  progress: ScrollPosition;
  max: ScrollDimensions;
}

export type ScrollEffect = (props: ScrollEffectProps) => void;
export type Element = React.MutableRefObject<HTMLElement>;

export interface ScrollHookProps {
  element?: Element;
  useWindow?: boolean;
  deps?: readonly any[];
  wait?: number;
}

export function getScrollPosition({
  element,
  useWindow,
}: ScrollHookProps): ScrollPosition {
  if (!isBrowser()) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: Math.abs(window.scrollX), y: Math.abs(window.scrollY) }
    : { x: Math.abs(position.left), y: Math.abs(position.top) };
}

export function getScrollDimensions({
  element,
}: ScrollHookProps): ScrollDimensions {
  if (!isBrowser()) return { width: 0, height: 0 };

  const target = element ? element.current : document.body;

  return {
    width: target.scrollWidth - window.innerWidth,
    height: target.scrollHeight - window.innerHeight,
  };
}

export const useScrollPosition = (
  effect: ScrollEffect,
  deps?: ScrollHookProps["deps"],
  element?: ScrollHookProps["element"],
  useWindow?: ScrollHookProps["useWindow"],
  wait = 16
) => {
  const position = useRef<ScrollPosition>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const handleScroll = throttle(() => {
      const currPos = getScrollPosition({ element, useWindow });
      const currDimensions = getScrollDimensions({ element });
      const progress = {
        x: currPos.x / currDimensions.width,
        y: currPos.y / currDimensions.height,
      };
      const effectProps: ScrollEffectProps = {
        prev: position.current,
        curr: currPos,
        progress,
        max: currDimensions,
      };
      effect(effectProps);
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
};
