import throttle from 'lodash/throttle'
import { useLayoutEffect, useEffect, useRef } from 'react'

const isBrowser = typeof window !== undefined

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left,  y: position.top }
}

export function getScrollDimensions({ element }) {
  if (!isBrowser) return { width: 0, height: 0 }

  const target = element ? element.current : document.body

  return {
    width: target.scrollWidth - window.innerWidth,
    height: target.scrollHeight - window.innerHeight,
  }
}

export function useScrollPosition(effect, deps, element, useWindow, wait = 16) {
  const position = useRef(getScrollPosition({ useWindow }))

  useLayoutEffect(() => {
    const handleScroll = throttle(() => {
      const currPos = getScrollPosition({ element, useWindow })
      const currDimensions = getScrollDimensions({ element })
      const progress = {
        x: Math.abs(currPos.x) / currDimensions.width,
        y: Math.abs(currPos.y) / currDimensions.height,
      }
      effect({ prevPos: position.current, currPos, progress })
      position.current = currPos
    }, wait)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, deps)
}
