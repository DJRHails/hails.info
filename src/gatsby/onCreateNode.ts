import { GatsbyNode } from "gatsby";
import _ from "lodash";

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  getNode,
  actions,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    // Get the parent node
    // This is different from frontmatter.parent below
    const parent = getNode(_.get(node, "parent")!);

    // adds a "collection" field to distinguish between md folders
    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName"),
    });
  }
};
