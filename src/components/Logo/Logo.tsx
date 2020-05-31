import React from "react";

import classNames from "classnames";

interface LogoProps {
  url?: true;
  size?: "lg"|"md";
}

const Logo: React.FC<LogoProps> = ({ url, size }) => {
  const styles = classNames("logo", {
    "display-1": size == "lg"
  });
  const WrappingElem = size == "lg" ? `h1` : size == "md" ? `h3` : `p`
  return (
    <WrappingElem className={styles}>
      HAILS
      {url && <span className="small">.info</span>}
    </WrappingElem>
  );
};

export default Logo;
