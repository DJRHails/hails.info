import { GatsbyNode } from "gatsby";
import * as path from "path";

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, getConfig, stage }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "../src/components/"),
        "@styles": path.resolve(__dirname, "../src/styles/"),
        "@utils": path.resolve(__dirname, "../src/utils/"),
        "@assets": path.resolve(__dirname, "../src/assets/"),
        "@sections": path.resolve(__dirname, "../src/sections/"),
        "@queries": path.resolve(__dirname, "../src/queries/"),
      },
      extensions: [".js", ".json", ".ts", ".tsx"],
    },
  });
};
