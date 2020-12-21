import { GatsbyNode } from "gatsby";
import * as path from "path";

// Speedy logging function to print progress to terminal
const log = (msg: string, section: string): void =>
  console.log(`\n\x1b[36m${msg} \x1b[4m${section}\x1b[0m\x1b[0m\n`);

// Some useful variables
const queryLimit = process.env.NODE_ENV === "development" ? 10 : 9999; // Limit pages for deving

interface ContentNode {
  node: {
    fields: {
      collection: string;
    };
    frontmatter: {
      slug: string;
    };
  };
}

export const createPages: GatsbyNode["createPages"] = async ({
  actions: { createPage },
  graphql,
}) => {
  const content = (await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/(?:projects|experience).[^_]/" }
          frontmatter: { slug: { ne: null } }
        }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              collection
            }
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)) as any;

  if (content.errors) {
    throw content.errors;
  }

  const contentNodes: [ContentNode] = content.data.allMarkdownRemark.edges;

  contentNodes.forEach(({ node }: ContentNode, index: number) => {
    const previous =
      index === contentNodes.length - 1 ? null : contentNodes[index + 1].node;
    const next = index === 0 ? null : contentNodes[index - 1].node;
    const slug = node.frontmatter.slug;

    switch (node.fields.collection) {
      case "projects":
        console.log(`Creating Project Page: ${slug}`);
        createPage({
          path: slug,
          component: path.resolve("./src/templates/Project.tsx"),
          context: {
            next,
            previous,
            slug,
          },
        });
        break;

      default:
        break;
    }
  });
};
