"use strict";

const path = require("path");

module.exports = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "../src/components/"),
        "@styles": path.resolve(__dirname, "../src/styles/"),
        "@utils": path.resolve(__dirname, "../src/utils/"),
        "@assets": path.resolve(__dirname, "../src/assets/"),
        "@sections": path.resolve(__dirname, "../src/sections/"),
      },
      extensions: [".js", ".json", ".ts", ".tsx"],
    },
  });
};
