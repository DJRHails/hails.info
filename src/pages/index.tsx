import { graphql, Link } from "gatsby";
import React from "react";

import AdaptText from "@components/AdaptText";
import Layout from "@components/Layout";
import ProjectCard from "@components/ProjectCard";
import Section from "@components/Section";
import SEO from "@components/SEO";
import * as Home from "@sections/Home";

import rehypeReact from "rehype-react";

import "@styles/main.scss";

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const heroNode = data.hero.edges[0].node;
  const projectEdges = data.featuredProjects.edges;
  const { title, description } = data.projectSection.edges[0].node.frontmatter;
  return (
    <Layout nav={{}} footer={{visible: true, className: ""}}>
      <>
        <SEO pathname="/" />
        <div className="page-wrapper">
          <Home.HeroUnit>{renderAst(heroNode.htmlAst)}</Home.HeroUnit>
          <Home.Proficiencies skills={heroNode.frontmatter.skills} />
          <Home.Projects
            title={title}
            subtitle={description}
            projects={projectEdges}
          />
          <Home.Experience />
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
      filter: { fileAbsolutePath: { regex: "/projects._index/" } }
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
          frontmatter {
            title
            date(formatString: "MMMM YYYY")
            github
            external
            description
            company
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

export default IndexPage;
