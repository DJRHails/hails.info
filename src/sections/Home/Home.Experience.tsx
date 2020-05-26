import ExperienceElement from "@components/ExperienceElement";
import Section from "@components/Section";
import { Frontmatter, GraphqlNode } from "@queries";
import { Experience } from "@queries/experience";
import React from "react";

interface ExperienceSectionProps {
  title: string;
  experiences: [GraphqlNode<Frontmatter<Experience> & { excerpt: string }>];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  title,
  experiences,
}) => {
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
      l2d
      orientation={{ top: true, left: true }}
    >
      <ul className="experience">{experienceElements}</ul>
    </Section>
  );
};

export default ExperienceSection;
