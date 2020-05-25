import { useEffect, useRef } from "react";
import {
  eventToShortcut,
  ShortcutKeys,
  shortcutMatchesFeatureKeys,
} from "./keyboard";

export interface Feature {
  name: string;
  keys: ShortcutKeys;
}

// Consider performance implications of this as opposed to a common event handler:
// useEffect(() => {
//   window.addEventListener("keydown", myHandlerForEverything)
//   return () => window.removeEventListener("keydown", myHandlerForEverything)
// }, [])
const useShortcut = (effect: VoidFunction, feature: Feature) => {
  const effectRef = useRef<VoidFunction>();
  // TODO(DJRHails): Can I but effect as initial
  effectRef.current = effect;

  // Add event listeners
  useEffect(() => {
    const handleKeydownEvent = (event: KeyboardEvent) => {
      // Check if we're in an input, don't act then!
      const activeElement = document.activeElement;
      const inputs = ["input", "select", "textarea"];
      const noInputIsFocused =
        activeElement &&
        inputs.indexOf(activeElement.tagName.toLowerCase()) === -1;

      const shortcut = eventToShortcut(event);
      const matched = shortcutMatchesFeatureKeys(shortcut, feature.keys);

      if (matched && noInputIsFocused) {
        console.log(
          `Pressed ${shortcut.join(" + ")} and matched ${feature.name}`
        );
        // We've got a custom controller for this key
        event.preventDefault();

        effectRef.current?.();
      }
    };

    window.addEventListener("keydown", handleKeydownEvent);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", handleKeydownEvent);
    };
  }, [effectRef]); // rerun the effect if the targetKey changes
};

export default useShortcut;
