import React from "react";

import HeroPng from "@assets/hero/HAILS.png";
import HeroWebp from "@assets/hero/HAILS.webp";

import Section from "@components/Section";

const HeroUnit: React.FC = ({ children }) => {
  return (
    <Section id="intro" className="hero-sub inverse" arrow>
      <picture className="background">
        <source type="image/webp" srcSet={HeroWebp} />
        <source type="image/png" srcSet={HeroPng} />
        <img src={HeroPng} alt="Silhouette profile image" />
      </picture>
      <div className="container">
        <div className="row">
          <div className="p-0 col-sm-12 col-md-6">
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
