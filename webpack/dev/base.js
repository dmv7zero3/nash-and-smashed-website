// webpack/dev/base.js
import { baseConfig } from "../common/base.js";
import { devOptimization } from "../common/optimization.js";

export const devBase = {
  ...baseConfig,
  mode: "development",
  devtool: "inline-source-map",
  optimization: devOptimization,
};
