import ExperienceElement from "@components/ExperienceElement";
import Section from "@components/Section";
import React from "react";

const Experience: React.FC = ({ title, experiences }) => {
  const experienceElements =
    experiences &&
    experiences.map(({ node }, i) => {
      return <ExperienceElement key={i} data={node} />;
    });

  return (
    <Section
      id="experience"
      title={title}
      className="dark"
      skew
      orientation={["top", "left"]}
    >
      <ul className="experience">{experienceElements}</ul>
    </Section>
  );
};

export default Experience;
