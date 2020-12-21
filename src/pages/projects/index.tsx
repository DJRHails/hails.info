import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout from "@components/Layout";
import ProjectCard from "@components/ProjectCard";
import Section from "@components/Section";
import SEO from "@components/SEO";

import rehypeReact from "rehype-react";

import { Frontmatter, MarkdownMetadata, MarkdownRemark } from "@queries";
import { ProjectFrontmatter } from "@queries/projects";
import "@styles/main.scss";

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

interface ProjectsPageProps {
  data: {
    section: MarkdownRemark<
      Frontmatter<{ title: string; description: string }> & { htmlAst: any }
    >;
    projects: MarkdownMetadata<ProjectFrontmatter>;
  };
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const projects = data.projects.edges;
  const projectCards =
    projects &&
    projects.map(({ node }, i) => (
      <ProjectCard key={i} data={node.frontmatter} />
    ));
  const { frontmatter, htmlAst } = data.section.edges[0].node;
  return (
    <Layout nav={{ active: "projects" }} footer={{}} page>
      <SEO
        pathname="/projects"
        title="Projects | hails.info"
        contentType="website"
      />
      <Section id="projects" className="section__first" title="Projects">
        {renderAst(htmlAst)}
        {projectCards}
      </Section>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    section: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content.projects._index/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
          }
          htmlAst
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content.projects.[^_]/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          ...ProjectFrontmatter
        }
      }
    }
  }
`;

export default ProjectsPage;
