import { GatsbyNode, CreateSchemaCustomizationArgs } from "gatsby";

// Reference: https://gist.github.com/adamavenir/38f1785aaeb8591a2f161bb840a75e6e
// Honestly worst part of gatsby is this...

// @ts-ignore
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async ({ actions: { createTypes } }) => {
  // MarkdownRemark @link(by: "frontmatter.slug", from: "parent")
  // SELECT * FROM MarkdownRemark WHERE frontmatter.slug = parent LIMIT 1
  //
  // [MarkdownRemark] @link(by: "frontmatter.parent", from: "slug")
  // SELECT * from MarkdownRemark WHERE frontmatter.parent = slug
  //
  // [MarkdownRemark] @link(by: "frontmatter.slug", from: "related")
  // SELECT * FROM MarkdownRemark WHERE frontmatter.slug = related LIMIT 1

  const typeDefs = `
    type MarkdownRemark implements Node @infer {
      frontmatter: Frontmatter
    }

    type Frontmatter @infer {
      title: String
      associated_with: String
      degree: String
      tags: [String]
      highlight: Boolean
      role: String
      company: String
      location: String
      external: String
      tech: [String]
      skills: [String]
      github: String
      description: String
      recognition: [MarkdownRemark] @link(by: "frontmatter.title", from: "recognition")
    }
  `;
  createTypes(typeDefs);
};
