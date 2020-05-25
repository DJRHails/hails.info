import { useEffect, useState } from "react";
import { isBrowser } from "./browser";

function useMedia<V>(queries: [string], values: [V], defaultValue: V) {
  const mediaQueryLists = isBrowser()
    ? queries.map((q) => window.matchMedia(q))
    : [];

  const getValue = () => {
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  };
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    // By defining getValue outside of useEffect we ensure that it has
    // current values of hook args (as this hook callback is created once on mount).
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, []);

  return value;
}

export default useMedia;
