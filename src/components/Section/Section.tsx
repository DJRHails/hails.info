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
  l2d?: true;
  orientation?: {
    top?: true;
    left?: true;
    right?: true;
    bottom?: true;
  };
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  className,
  containerClass,
  skew,
  arrow,
  l2d,
  orientation,
  children,
}) => {
  const sectionClass = classNames("section", className, {
    [`separator-arrow`]: arrow,
  });

  const separatorClass = classNames("separator-diagonal", {
    [`-reverse`]: orientation?.left,
    [`-l2d`]: l2d,
    [`-top`]: orientation?.top,
    [`-bottom`]: orientation?.bottom,
  });

  return (
    <>
      {skew && orientation?.top && <div className={separatorClass} />}
      <section id={id} className={sectionClass}>
        <div className={classNames("container", containerClass)}>
          <EntryTitle id={id} title={title} subtitle={subtitle} />
          {children}
        </div>
      </section>
      {skew && orientation?.bottom && <div className={separatorClass} />}
    </>
  );
};

export default Section;
