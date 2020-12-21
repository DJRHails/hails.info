import React, { useEffect } from "react";

import CookieConsent from "@components/CookieConsent";
import Footer from "@components/Footer";
import Container from "@components/Layout/Layout.Container";
import Navigation from "@components/Navigation";
import { useDarkMode } from "@utils";
import { controlOrMetaKey } from "@utils/keyboard";
import {
  DARK_THEME_CLASS_NAME,
  DEFAULT_THEME_CLASS_NAME,
  THEME_CLASSES,
} from "@utils/useDarkMode";
import useShortcut from "@utils/useShortcut";

interface LayoutProps {
  nav?: {
    active: string;
  };
  footer?: {
    className?: string;
  };
  page?: true;
  content?: true;
  children?: React.ReactNode;
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<LayoutProps> = ({
  children,
  footer,
  page,
  content,
}: LayoutProps) => {
  const [darkMode, setDarkMode] = useDarkMode();

  useShortcut(
    () => {
      setDarkMode((mode: boolean) => !mode);
    },
    {
      name: "Toggle Dark Mode",
      keys: [controlOrMetaKey(), "D"],
    }
  );

  useEffect(
    () => {
      const element = window.document.body;
      if (darkMode) {
        element.classList.remove(...THEME_CLASSES);
        element.classList.add(DARK_THEME_CLASS_NAME);
      } else {
        element.classList.remove(...THEME_CLASSES);
        element.classList.add(DEFAULT_THEME_CLASS_NAME);
      }
    },
    [darkMode] // Only re-call effect when value changes
  );

  return (
    <>
      <Navigation />
      {/* Removed till I actually use cookies for something
      <CookieConsent acceptOnScroll>
        This website uses cookies{" "}
        <span role="img" aria-label="cookies">
          🍪
        </span>{" "}
        so I can enhance the user experience. Hope thats cool with you!
      </CookieConsent>
    */}
      <Container page={page} content={content}>
        {children}
      </Container>
      {footer && <Footer className={footer?.className} />}
    </>
  );
};

export default Layout;
