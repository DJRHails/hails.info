import { graphql } from "gatsby";
import React from "react";

import Layout from "@components/Layout";
import SEO from "@components/SEO";
import * as Home from "@sections/Home";

import rehypeReact from "rehype-react";

import { Frontmatter, MarkdownMetadata, MarkdownRemark } from "@queries";
import { Experience } from "@queries/experience";
import { Hero } from "@queries/hero";
import { Project } from "@queries/projects";
import "@styles/main.scss";

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

interface IndexPageProps {
  data: {
    hero: MarkdownRemark<Frontmatter<Hero> & { htmlAst: any }>;
    projectSection: MarkdownMetadata<{ title: string; description: string }>;
    featuredProjects: MarkdownMetadata<Project>;
    experienceSection: MarkdownMetadata<{ title: string }>;
    experiences: MarkdownRemark<Frontmatter<Experience> & { excerpt: string }>;
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const heroNode = data.hero.edges[0].node;

  const projectEdges = data.featuredProjects.edges;
  const projectIndex = data.projectSection.edges[0].node;

  const experienceIndex = data.experienceSection.edges[0].node;
  const experiences = data.experiences.edges;

  return (
    <Layout footer={{ className: "" }}>
      <>
        <SEO pathname="/" contentType="website" />
        <div className="page-wrapper">
          <Home.HeroUnit>{renderAst(heroNode.htmlAst)}</Home.HeroUnit>
          <Home.Proficiencies skills={heroNode.frontmatter.skills} />
          <Home.Projects
            title={projectIndex.frontmatter.title}
            subtitle={projectIndex.frontmatter.description}
            projects={projectEdges}
          />
          <Home.Experience
            title={experienceIndex.frontmatter.title}
            experiences={experiences}
          />
        </div>
      </>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            skills
          }
          htmlAst
        }
      }
    }

    projectSection: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects._featured/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
          }
        }
      }
    }
    featuredProjects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/assets.projects.[^_]/" }
        frontmatter: { highlight: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          ...ProjectFrontmatter
        }
      }
    }

    experienceSection: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/experience._index/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
    experiences: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/assets.experience.[^_]/" }
        frontmatter: { highlight: { ne: false } }
      }
      sort: { fields: [frontmatter___period___to], order: DESC }
    ) {
      edges {
        node {
          excerpt(format: PLAIN)
          ...ExperienceFrontmatter
        }
      }
    }
  }
`;

export default IndexPage;
