import React from "react";

import classNames from "classnames";
import EntryTitle from "./Section.EntryTitle";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClass?: string;
  skew?: boolean;
  arrow?: boolean;
  orientation?: string[];
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  className,
  containerClass,
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
      <div className={classNames("container", containerClass)}>
        <EntryTitle id={id} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
};

export default Section;
