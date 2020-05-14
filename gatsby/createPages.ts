import { GatsbyNode } from "gatsby";
import * as path from "path";

// Speedy logging function to print progress to terminal
const log = (msg: string, section: string): void =>
  console.log(`\n\x1b[36m${msg} \x1b[4m${section}\x1b[0m\x1b[0m\n`);

// Some useful variables
const queryLimit = process.env.NODE_ENV === "development" ? 10 : 9999; // Limit pages for deving

export const createPages: GatsbyNode["createPages"] = async ({ actions: { createPage }, graphql }) => {

};
