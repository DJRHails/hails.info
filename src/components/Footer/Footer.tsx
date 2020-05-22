import ConversationInvite from "@components/Footer/Footer.ConversationInvite";
import Section from "@components/Section";
import classNames from "classnames";
import React from "react";

const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <Section id="footer" className={classNames("footer", className)}>
      <ConversationInvite />
    </Section>
  );
};

export default Footer;
