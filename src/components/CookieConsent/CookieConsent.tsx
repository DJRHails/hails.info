import { useScrollPosition } from '@utils'
import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

interface CookieConsentProps {
  acceptOnScroll?: boolean
}

const LearnMore: React.FC = () => {
  return (
    <a
      aria-label="learn more about cookies"
      className="cc-link"
      href="https://www.cookiesandyou.com"
      target="_blank"
    >
      Learn more
    </a>
  )
}

const ComplianceGroup: React.FC = ({ onDismiss }) => {
  return (
    <div class="cc-compliance">
      <a
        aria-label="dismiss cookie message"
        role="button"
        tabindex="0"
        className="btn cc-dismiss"
        onClick={onDismiss}
      >
        Got it!
      </a>
    </div>
  )
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  acceptOnScroll,
  cookieName= 'CookieConsent',
  children,
}) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(Cookies.get(cookieName) === undefined)
  }, [])

  const updateCookie = (reason) => {
    Cookies.set(cookieName, reason)
    setVisible(false)
  }

  useScrollPosition(({ progress }) => {
    if (visible && acceptOnScroll && progress.y > 0.25) {
      updateCookie("scrolled")
    }
  }, [setVisible])

  return (
    visible &&
    <div
      role="dialog"
      aria-live="polite"
      aria-label="cookieconsent"
      aria-describedby="cookieconsent:desc"
      className="cc-window"
    >
      <span id="cookieconsent:desc" className="cc-message">
        {children}
        <LearnMore/>
      </span>
      <ComplianceGroup onDismiss={() => updateCookie("clicked")}/>
    </div>
  )
}

export default CookieConsent
