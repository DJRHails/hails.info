import React from "react";
import Section from "@components/Section";
import { IconGitHub } from "@components/Icons";
import classNames from "classnames";
import ConversationInvite from "@components/Footer/Footer.ConversationInvite";

const Footer: React.FC = ({ className }) => {
  return (
    <Section
      id="footer"
      className={classNames("footer", className)}
    >
      <ConversationInvite/>
    </Section>
  );
};

export default Footer;
