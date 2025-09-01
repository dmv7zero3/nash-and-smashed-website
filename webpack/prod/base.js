// webpack/prod/base.js
import { baseConfig } from "../common/base.js";
import { prodOptimization } from "../common/optimization.js";

export const prodBase = {
  ...baseConfig,
  mode: "production",
  devtool: "source-map", // Keep this
  optimization: prodOptimization,

  performance: {
    maxEntrypointSize: 2500000,
    maxAssetSize: 2000000,
    hints: "warning",
    assetFilter: function (assetFilename) {
      return (
        !assetFilename.endsWith(".ttf") &&
        !assetFilename.endsWith(".woff2") &&
        !assetFilename.match(/data\.blogs/) &&
        !assetFilename.endsWith(".mp4") &&
        !assetFilename.endsWith(".map")
      );
    },
  },

  output: {
    ...baseConfig.output,
    filename: "js/[name].[contenthash].js",
    chunkFilename: "js/[name].[contenthash].js",

    // SOLUTION: Remove sourceMapFilename entirely
    // Let webpack generate maps with matching contenthash automatically

    assetModuleFilename: (pathData) => {
      const filepath = pathData.filename.split("/").slice(1);
      if (filepath[0] === "fonts") return "fonts/[name].[contenthash][ext]";
      if (filepath[0] === "images") return "images/[name].[contenthash][ext]";
      return "assets/[name].[contenthash][ext]";
    },
  },
};
