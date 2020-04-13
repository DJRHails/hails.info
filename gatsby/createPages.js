"use strict";

const path = require("path");

// Speedy logging function to print progress to terminal
const log = (msg, section) =>
  console.log(`\n\x1b[36m${msg} \x1b[4m${section}\x1b[0m\x1b[0m\n`);

// Some useful variables
const queryLimit = process.env.NODE_ENV === "development" ? 10 : 9999; // Limit pages for deving

module.exports = async ({ actions: { createPage }, graphql }) => {
  const opts = { limit: queryLimit };
};
