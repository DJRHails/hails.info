'use strict'

const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `src/assets` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
