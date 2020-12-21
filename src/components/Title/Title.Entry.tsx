import React from "react";

const Entry: React.FC<{
  title?: string;
  subtitle?: string;
}> = ({ title, subtitle }) => {
  return title ? (
    <header className="entry-title">
      {title && <h1 className="entry-title__title">{title}</h1>}
      {subtitle && <h3 className="entry-title__subheader">{subtitle}</h3>}
    </header>
  ) : null;
};

export default Entry;
