import React from "react";

import Section from "@components/Section";

const HeroUnit: React.FC = ({ children }) => {
  return (
    <Section id="intro" className="hero-sub inverse" arrow>
      <div className="background" />
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <div className="hero-unit">{children}</div>
          </div>
        </div>
      </div>
      <a
        href="#proficiencies"
        aria-label="scroll to proficiencies"
        role="button"
      >
        <span className="mouse btn-next" />
      </a>
    </Section>
  );
};

export default HeroUnit;
