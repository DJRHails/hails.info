import React from "react";
import Section from "@components/Section";
import { IconGitHub } from "@components/Icons";
import classNames from "classnames";

const Footer: React.FC = ({ className }) => {
  return (
    <Section
      id="footer"
      className={classNames("footer", className)}
    >
      <p className="footer__line text-muted">WHAT NEXT?</p>
      <h2>Let's make the conversation less one sided:</h2>
      <h2>
        <a href="mailto:daniel@hails.info">
          <strong>daniel@hails.info</strong>
        </a>
      </h2>
    </Section>
  );
};

export default Footer;
