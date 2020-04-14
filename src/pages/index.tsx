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
  const projectIndex = data.projectSection.edges[0].node;

  const experienceIndex = data.experienceSection.edges[0].node;
  const experiences = data.experiences.edges;

  return (
    <Layout nav={{}} footer={{visible: true, className: ""}}>
      <>
        <SEO pathname="/" />
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
      fileAbsolutePath: { regex: "/assets.experience.[^_]/" },
      frontmatter: { highlight: { ne: false } }
    }
    sort: { fields: [frontmatter___period___to], order: DESC }
  ) {
    edges {
      node {
        excerpt(format: PLAIN)
        frontmatter {
          role
          company
          location
          external
          period {
            from(formatString:"MMM YY")
            to(formatString:"MMM YY")
          }
          tags
          tech
          highlight
          cover {
            childImageSharp {
              fluid(maxWidth: 700, quality: 90, traceSVG: { color: "rgb(255, 255, 255)"}) {
                tracedSVG
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
