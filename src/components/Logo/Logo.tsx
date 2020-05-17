import React from "react";

import classNames from "classnames";

const Logo: React.FC = ({ size, className }) => {
  return (
    <h1 className={classNames("logo", className)}>
      HAILS
      <span className="small">.info</span>
    </h1>
  );
};

export default Logo;
