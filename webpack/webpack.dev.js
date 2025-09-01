// webpack/webpack.dev.js
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";
import { devBase } from "./dev/base.js";
import { devServerConfig } from "./dev/server.js";

const config = merge(commonConfig, devBase, {
  devServer: devServerConfig,
});

export default config;
