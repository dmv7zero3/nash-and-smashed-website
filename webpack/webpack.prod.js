// webpack/webpack.prod.js
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";
import { prodBase } from "./prod/base.js";
import { s3Plugin } from "./prod/server.js";
import { createRequire } from "module";
import { generateStaticHtmlPlugins } from "./prod/staticRoutes-blog.js";
import { fileURLToPath } from "url";
import path from "path";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const require = createRequire(import.meta.url);

// Generate static HTML plugins for each route
const staticHtmlPlugins = generateStaticHtmlPlugins();

console.log(
  "Static routes:",
  staticHtmlPlugins.map((plugin) => plugin.options.filename)
);

// Create a new commonConfig without the default HtmlWebpackPlugin
const filteredCommonConfig = {
  ...commonConfig,
  plugins: commonConfig.plugins.filter(
    (plugin) => plugin.constructor.name !== "HtmlWebpackPlugin"
  ),
};

// SIMPLIFIED: Reduce plugin complexity during source map debugging
const productionPlugins = [
  ...staticHtmlPlugins,
  // Temporarily disable S3 plugin to isolate source map issue
  // Add back after confirming source maps work
  // ...(s3Plugin ? [s3Plugin] : []),
];

const config = merge(filteredCommonConfig, prodBase, {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
  plugins: productionPlugins,
});

export default config;
