import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout from "@components/Layout";
import ProjectCard from "@components/ProjectCard";
import Section from "@components/Section";
import SEO from "@components/SEO";

import rehypeReact from "rehype-react";

import { Frontmatter, MarkdownMetadata, MarkdownRemark } from "@queries";
import { Project } from "@queries/projects";
import "@styles/main.scss";

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

interface ProjectsPageProps {
  data: {
    section: MarkdownRemark<
      Frontmatter<{ title: string; description: string }> & { htmlAst: any }
    >;
    projects: MarkdownMetadata<Project>;
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
    <Layout footer={{}}>
      <>
        <SEO
          pathname="/projects"
          title="Projects | hails.info"
          contentType="website"
        />
        <div className="page-wrapper">
          <Section id="projects">
            <h1>
              <Link to="/#experience">
                <span className="p-3">‹</span>
              </Link>
              {frontmatter.title}
            </h1>
            {renderAst(htmlAst)}
            {projectCards}
          </Section>
        </div>
      </>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    section: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects._index/" } }
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
      filter: { fileAbsolutePath: { regex: "/assets.projects.[^_]/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM YYYY")
            github
            external
            description
            company
            tech
            cover {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ProjectsPage;
