import React from "react";

import classNames from "classnames";

import ConversationInvite from "@components/Footer/Footer.ConversationInvite";
import Section from "@components/Section";
import Logo from "@components/Logo";

const BottomNav: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <hr/>
        <Logo size="md"/>
      </div>
    </footer>
  );
}

const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  return (
    <>
      <Section id="conversation" className={classNames("conversation", className)}>
        <ConversationInvite />
      </Section>
      <BottomNav />
    </>
  );
};

export default Footer;
