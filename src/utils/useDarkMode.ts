import { useLocalStorage, useMedia } from "@utils";

// TODO(DJRHails): Some repetition between styles and react here
export const DEFAULT_THEME_CLASS_NAME = "-t-default";
export const DARK_THEME_CLASS_NAME = "-t-dark";
export const THEME_CLASSES = [DEFAULT_THEME_CLASS_NAME, DARK_THEME_CLASS_NAME];

function useDarkMode(): [
  boolean,
  (newMode: boolean | ((prev: boolean) => void)) => void
] {
  const [enabledState, setEnabledState] = useLocalStorage<boolean>(
    "dark-mode-enabled",
    false
  );
  const prefersDarkMode = usePrefersDarkMode();
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;

  return [enabled, setEnabledState];
}

// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
function usePrefersDarkMode(): boolean {
  return useMedia<boolean>(["(prefers-color-scheme: dark)"], [true], false);
}

export default useDarkMode;
