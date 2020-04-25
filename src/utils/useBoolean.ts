import { useCallback, useState } from "react";

/**
 * useBoolean hook
 *
 * @param {mixed} initial
 */
const useBoolean = (initial: any) => {
  const [value, setValue] = useState(initial);
  return {
    value,
    setValue,
    toggle: useCallback(() => setValue((v: any) => !v), []),
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
  };
};

export default useBoolean;
