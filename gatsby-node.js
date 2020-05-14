const { onCreateNode } = require("./gatsby/onCreateNode");
const { createPages } = require("./gatsby/createPages");
const { onCreateWebpackConfig } = require("./gatsby/onCreateWebpackConfig");
const {
  createSchemaCustomization,
} = require("./gatsby/createSchemaCustomization");

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.createSchemaCustomization = createSchemaCustomization;
