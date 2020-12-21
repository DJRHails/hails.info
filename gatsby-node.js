const { onCreateNode } = require("./src/gatsby/onCreateNode");
const { createPages } = require("./src/gatsby/createPages");
const { onCreateWebpackConfig } = require("./src/gatsby/onCreateWebpackConfig");
const {
  createSchemaCustomization,
} = require("./src/gatsby/createSchemaCustomization");

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.createSchemaCustomization = createSchemaCustomization;
