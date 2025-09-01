// webpack/webpack.common.js
import { merge } from "webpack-merge";
import { baseConfig } from "./common/base.js";
import { commonPlugins, resolvePlugins } from "./common/plugins.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleRules = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "../postcss.config.cjs"),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[contenthash][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: { progressive: true, quality: 75 },
              optipng: { enabled: true },
              pngquant: { quality: [0.65, 0.8], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 80 },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash][ext]", // Add contenthash for caching
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8192, // Inline small fonts (8KB threshold)
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mov)$/i,
        type: "asset/resource",
        generator: {
          filename: "videos/[name].[contenthash][ext]",
        },
      },
    ],
  },
};

const config = merge(baseConfig, moduleRules, {
  resolve: {
    ...baseConfig.resolve,
    plugins: resolvePlugins,
  },
  plugins: commonPlugins,
});

export default config;
