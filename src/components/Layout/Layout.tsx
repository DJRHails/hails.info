import React from "react";

import CookieConsent from "@components/CookieConsent";
import Footer from "@components/Footer";
import Container from "@components/Layout/Layout.Container";

interface LayoutProps {
  nav: {
    fixed?: boolean;
    offset?: boolean;
    theme?: string;
  };
  footer: {
    visible?: boolean;
    className?: string;
  };
}

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<LayoutProps> = ({ children, footer, ...rest }) => {
  const { visible, className } = footer;

  return (
    <>
      <CookieConsent acceptOnScroll>
        This website uses cookies{" "}
        <span role="img" aria-label="cookies">
          🍪
        </span>{" "}
        so I can enhance the user experience. Hope thats cool with you!
      </CookieConsent>
      <Container {...rest}>
        {children}
        <Footer className={className}/>
      </Container>
    </>
  );
};

export default Layout;
