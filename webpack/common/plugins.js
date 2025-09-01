// webpack/common/plugins.js
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from "webpack";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import dotenv from "dotenv";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

// Load environment variables
const env = dotenv.config().parsed || {};
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

export const bundleAnalyzerPlugin = process.env.ANALYZE
  ? new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    })
  : null;

export const commonPlugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(process.cwd(), "public/index.html"),
    filename: "index.html",
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      minifyCSS: true,
      minifyJS: true,
    },
    // Add this to ensure routes work properly with static files
    scriptLoading: "defer",
    inject: true,
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
    chunkFilename: "styles/[id].[contenthash].css",
  }),
  new webpack.DefinePlugin(envKeys),
  // Add bundle analyzer conditionally
  bundleAnalyzerPlugin,
].filter(Boolean); // Filter out null values

export const resolvePlugins = [
  new TsconfigPathsPlugin({
    configFile: path.resolve(process.cwd(), "tsconfig.json"),
  }),
];
