import React from "react";

import HeroPng from "@content/hero/HAILS.png";
import HeroWebp from "@content/hero/HAILS.webp";

import Section from "@components/Section";

const HeroUnit: React.FC = ({ children }) => {
  return (
    <Section id="intro" className="hero-sub inverse" spaced center arrow>
      <picture>
        <source type="image/webp" srcSet={HeroWebp} />
        <source type="image/png" srcSet={HeroPng} />
        <img
          src={HeroPng}
          className="background"
          alt="Silhouette profile image"
        />
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
