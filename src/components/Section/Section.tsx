import React from "react";

import classNames from "classnames";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  skew?: boolean;
  arrow?: boolean;
  orientation?: string[];
}

const EntryTitle: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return title ? (
    <header className="entry-title">
      <h1>{title}</h1>
      <h3 className="subtitle">{subtitle}</h3>
    </header>
  ) : null;
};

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  className,
  skew,
  arrow,
  orientation,
  children,
}) => {
  const orientationModifier =
    orientation && orientation.filter(Boolean).join("-");
  const sectionClass = classNames("section", className, {
    [`separator-skew-${orientationModifier}`]: skew && orientation,
    [`separator-arrow`]: arrow,
  });

  return (
    <section id={id} className={sectionClass}>
      <div className="container">
        <EntryTitle title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
};

export default Section;
