import { Link } from "gatsby";
import _ from "lodash";
import React from "react";

const TOPIC_TO_LINK = {
  projects: "/projects",
};

const Splash: React.FC<{
  topic?: string;
  title?: string;
  subtitle?: string;
}> = ({ title, topic, subtitle }) => {
  const link = _.get(TOPIC_TO_LINK, topic ?? "", null);
  const topicLinked = link ? <Link to={link}>{topic}</Link> : topic;

  return title ? (
    <header className="splash-title">
      {topic && <h4 className="splash-title__topic">{topicLinked}</h4>}
      {title && <h1 className="splash-title__title">{title}</h1>}
      {subtitle && <h3 className="splash-title__subheader">{subtitle}</h3>}
      {/* <button className="splash-title__copylink"></button> */}
    </header>
  ) : null;
};

export default Splash;
