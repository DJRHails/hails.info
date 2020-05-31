import React from "react";

const ConversationInvite: React.FC = () => {
  return (
    <>
      <p className="footer__line">SO, WHAT NEXT?</p>
      <h2>Let's make the conversation less one sided.</h2>
      {/* Would be nice to have a little profile imge with a green gradient circle estimate.
        Maybe with a "Reply time: within 1-2 days".*/}
      <h2>
        Say{" "}
        <a href="mailto:hello@hails.info">
          <strong>hello@hails.info</strong>
        </a>
      </h2>
    </>
  );
};

export default ConversationInvite;
