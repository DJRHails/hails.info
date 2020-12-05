import React from "react";

import DiagonalButton from "@components/DiagonalButton";
import ProjectCard from "@components/ProjectCard";
import Section from "@components/Section";
import { Frontmatter, GraphqlNode } from "@queries";
import { Project } from "@queries/projects";

interface ProjectsProps {
  title: string;
  subtitle: string;
  projects: [GraphqlNode<Frontmatter<Project>>];
}

const Projects: React.FC<ProjectsProps> = ({ title, subtitle, projects }) => {
  const projectCards =
    projects &&
    projects.map(({ node }, i) => {
      const { frontmatter } = node;
      if (i % 2 === 1) {
        return <ProjectCard key={i} data={frontmatter} alternate />;
      }
      return <ProjectCard key={i} data={frontmatter} />;
    });
  return (
    <>
      <Section id="projects" title={title} subtitle={subtitle}>
        {projectCards}
        <div className="col-12">
          <DiagonalButton to="/projects">See More</DiagonalButton>
        </div>
      </Section>
    </>
  );
};

export default Projects;
