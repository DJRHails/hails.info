// With credit to Storybook (MIT):
// https://github.com/storybookjs/storybook/
// ...blob/23a46cbd4a64cda32520e0693f866bdcfb98f122/lib/ui/src/libs/shortcut.ts

export type ShortcutKeys = string[];
export type Shortcut = ShortcutKeys | any;

export const eventToShortcut = (e: KeyboardEvent): Shortcut | null => {
  // A Meta key only doesn't map to a shortcut. Needs to combine with another key!
  if (["Meta", "Alt", "Control", "Shift"].includes(e.key)) {
    return null;
  }

  const keys: any = [];

  if (e.altKey) {
    keys.push("alt");
  }
  if (e.ctrlKey) {
    keys.push("control");
  }
  if (e.metaKey) {
    keys.push("meta");
  }
  if (e.shiftKey) {
    keys.push("shift");
  }

  // Handle all regular keys like A, B, C, etc
  // for the key "i" do not uppercase it!
  if (e.key && e.key.length === 1 && e.key !== " " && e.key !== "i") {
    keys.push(e.key.toUpperCase());
  }

  // i is a special case becalse capital I and l/L look similar
  if (e.key === "i") {
    keys.push(e.key);
  }
  if (e.key === " ") {
    keys.push("space");
  }
  if (e.key === "Escape") {
    keys.push("escape");
  }
  if (e.key === "ArrowRight") {
    keys.push("ArrowRight");
  }
  if (e.key === "ArrowDown") {
    keys.push("ArrowDown");
  }
  if (e.key === "ArrowUp") {
    keys.push("ArrowUp");
  }
  if (e.key === "ArrowLeft") {
    keys.push("ArrowLeft");
  }
  if (e.key === "Tab") {
    keys.push("Tab");
  }

  return keys.length > 0 ? keys : null;
};

// Modified from Storybook
export const shortcutMatchesFeatureKeys = (
  inputShortcut: Shortcut,
  keys: ShortcutKeys
): boolean => {
  return (
    inputShortcut &&
    inputShortcut.length === keys.length &&
    !inputShortcut.find((key: string, i: number) => key !== keys[i])
  );
};

// Should this keyboard event trigger this keyboard shortcut?
export const eventMatchesFeatureKeys = (
  e: KeyboardEvent,
  keys: ShortcutKeys
): boolean => {
  return shortcutMatchesFeatureKeys(eventToShortcut(e), keys);
};

export const isMacLike = () => {
  if (typeof window !== "undefined") {
    return navigator && navigator.platform
      ? !!navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)
      : false;
  }

  return true;
};

export const controlOrMetaSymbol = () => (isMacLike() ? "⌘" : "ctrl");
export const controlOrMetaKey = () => (isMacLike() ? "meta" : "control");
export const optionOrAltSymbol = () => (isMacLike() ? "⌥" : "alt");
