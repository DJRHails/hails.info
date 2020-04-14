import { Link } from "gatsby";
import React from "react";

import ProjectCard from "@components/ProjectCard";
import Section from "@components/Section";

const Projects: React.FC = ({ title, subtitle, projects }) => {
  const projectCards =
    projects &&
    projects.map(({ node }, i) => {
      const { frontmatter } = node;
      return <ProjectCard key={i} data={frontmatter} />;
    });
  return (
    <Section id="projects" title={title} subtitle={subtitle}>
      {projectCards}
      <div className="col-12">
        <Link to="/projects">
          <button type="button" className="btn btn--outline btn--diagonal">
            <span>See More</span>
          </button>
        </Link>
      </div>
    </Section>
  );
};

export default Projects;
