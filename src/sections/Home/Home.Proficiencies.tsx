import React from "react";

import AdaptText from "@components/AdaptText";
import Section from "@components/Section";

const Proficiencies: React.FC = ({ skills }) => {
  return (
    <Section
      id="proficiencies"
      className="dark"
      skew
      orientation={["bottom", "left"]}
    >
      <AdaptText list={skills} />
    </Section>
  );
};

export default Proficiencies;
