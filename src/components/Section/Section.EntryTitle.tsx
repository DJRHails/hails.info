import React from "react";

const EntryTitle: React.FC<{
  id: string;
  title?: string;
  subtitle?: string;
}> = ({ id, title, subtitle }) => {
  return title ? (
    <header className="entry-title">
      <a id={id} />
      {title && <h1>{title}</h1>}
      {subtitle && <h3 className="subtitle">{subtitle}</h3>}
    </header>
  ) : null;
};

export default EntryTitle;
