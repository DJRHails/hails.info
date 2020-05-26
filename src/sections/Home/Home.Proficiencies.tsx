import React from "react";

import AdaptText from "@components/AdaptText";
import Section from "@components/Section";

interface ProficienciesProps {
  skills: [string];
}

const Proficiencies: React.FC<ProficienciesProps> = ({ skills }) => {
  return (
    <>
      <Section
        id="proficiencies"
        className="dark"
        skew
        orientation={{ bottom: true }}
      >
        <AdaptText list={skills} />
      </Section>
    </>
  );
};

export default Proficiencies;
