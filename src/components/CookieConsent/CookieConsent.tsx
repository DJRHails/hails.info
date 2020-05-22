import { useScrollPosition } from "@utils";
import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";

interface CookieConsentProps {
  acceptOnScroll?: false;
  learnMoreText?: string;
  dismissText?: string;
  cookieName?: string;
}

interface LearnMoreProps {
  text: string;
}

interface ComplianceGroupProps {
  onDismiss: VoidFunction;
  dismissText: string;
}

const LearnMore: React.FC<LearnMoreProps> = ({ text }) => {
  return (
    <a
      aria-label="learn more about cookies"
      className="cc-link"
      href="https://www.cookiesandyou.com"
      target="_blank"
      rel="noreferrer"
    >
      {text}
    </a>
  );
};

const ComplianceGroup: React.FC<ComplianceGroupProps> = ({
  onDismiss,
  dismissText,
}) => {
  return (
    <div className="cc-compliance">
      <a
        araia-describedby="dismiss cookie message"
        role="button"
        className="btn cc-dismiss"
        onClick={onDismiss}
      >
        {dismissText}
      </a>
    </div>
  );
};

const CookieConsent: React.FC<CookieConsentProps> = ({
  acceptOnScroll,
  learnMoreText = "More details!",
  dismissText = "No worries!",
  cookieName = "CookieConsent",
  children,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(Cookies.get(cookieName) === undefined);
  }, []);

  const updateCookie = (reason: string) => {
    Cookies.set(cookieName, reason);
    setVisible(false);
  };

  const onDismiss = () => updateCookie("clicked");

  useScrollPosition(
    ({ progress }) => {
      if (visible && acceptOnScroll && progress.y > 0.25) {
        updateCookie("scrolled");
      }
    },
    [setVisible]
  );

  return visible ? (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="cookieconsent"
      aria-describedby="cookieconsent:desc"
      className="cc-window"
    >
      <span id="cookieconsent:desc" className="cc-message">
        {children}
        <LearnMore text={learnMoreText} />
      </span>
      <ComplianceGroup onDismiss={onDismiss} dismissText={dismissText} />
    </div>
  ) : null;
};

export default CookieConsent;
