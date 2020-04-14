import ConversationInvite from "@components/Footer/Footer.ConversationInvite";
import { IconGitHub } from "@components/Icons";
import Section from "@components/Section";
import classNames from "classnames";
import React from "react";

const Footer: React.FC = ({ className }) => {
  return (
    <Section id="footer" className={classNames("footer", className)}>
      <ConversationInvite />
    </Section>
  );
};

export default Footer;
