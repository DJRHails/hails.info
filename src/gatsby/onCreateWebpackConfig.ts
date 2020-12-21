import { GatsbyNode } from "gatsby";
import * as path from "path";

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  getConfig,
  stage,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "../components/"),
        "@styles": path.resolve(__dirname, "../styles/"),
        "@utils": path.resolve(__dirname, "../utils/"),
        "@content": path.resolve(__dirname, "../../content/"),
        "@sections": path.resolve(__dirname, "../sections/"),
        "@queries": path.resolve(__dirname, "../queries/"),
      },
      extensions: [".js", ".json", ".ts", ".tsx"],
    },
  });
};
