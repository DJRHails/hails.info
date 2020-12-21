import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout from "@components/Layout";
import ProjectCard from "@components/ProjectCard";
import Section from "@components/Section";
import SEO from "@components/SEO";
import Title from "@components/Title";

import rehypeReact from "rehype-react";

import { Frontmatter, MarkdownMetadata, MarkdownRemark } from "@queries";
import { ProjectFrontmatter } from "@queries/projects";
import "@styles/main.scss";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  Fragment: React.Fragment,
}).Compiler;

interface ProjectProps {
  markdownRemark: Frontmatter<ProjectFrontmatter> & {
    htmlAst: any;
    fields: { collection: "projects" | "experience" | "education" };
  };
}

interface AdjacentContext {
  fields: { slug?: string };
  frontmatter: { title?: string };
}

interface SitePageContext {
  slug?: string;
  previous: AdjacentContext;
  next: AdjacentContext;
}

interface Template<T> {
  pageContent: SitePageContext;
  data: T;
}

const ProjectTemplate: React.FC<Template<ProjectProps>> = ({ data }) => {
  const { fields, frontmatter, htmlAst } = data.markdownRemark;

  return (
    <Layout footer={{}} content>
      <SEO
        pathname={frontmatter.slug}
        title={`${frontmatter.title} | Project | hails.info`}
        contentType="website"
      />
      <Section id="projects">
        <Title.Splash
          topic={fields.collection}
          title={frontmatter.title}
          subtitle={frontmatter.date}
        />
      </Section>
      {renderAst(htmlAst)}
    </Layout>
  );
};

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...ProjectFrontmatter
      htmlAst
    }
  }
`;

export default ProjectTemplate;
