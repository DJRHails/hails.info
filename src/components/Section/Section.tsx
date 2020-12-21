import React from "react";

import Title from "@components/Title";
import classNames from "classnames";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClass?: string;
  skew?: boolean;
  arrow?: boolean;
  l2d?: true;
  center?: true;
  spaced?: true;
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
  center,
  spaced,
  orientation,
  children,
}) => {
  const sectionClass = classNames("section", className, {
    [`separator-arrow`]: arrow,
    [`section__spaced`]: spaced,
    [`text-center`]: center,
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
          <Title.Entry title={title} subtitle={subtitle} />
          {children}
        </div>
      </section>
      {skew && orientation?.bottom && <div className={separatorClass} />}
    </>
  );
};

export default Section;
