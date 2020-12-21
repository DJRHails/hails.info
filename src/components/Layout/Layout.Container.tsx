import React from "react";

import classNames from "classnames";

interface LayoutProps {
  content?: true;
  page?: true;
}

const LayoutContainer: React.FC<LayoutProps> = ({
  page,
  content,
  children,
}) => {
  const wrapperClass = classNames({
    [`page-wrapper`]: page,
    [`content-wrapper`]: content,
  });
  return <div className={wrapperClass}>{children}</div>;
};

export default LayoutContainer;
