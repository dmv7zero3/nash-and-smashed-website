// webpack/common/base.js
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const baseConfig = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "../../src"),
      "@templates": path.resolve(__dirname, "../../src/components/templates"),
      "@photos": path.resolve(__dirname, "../../src/assets/images"),
      "@videos": path.resolve(__dirname, "../../src/assets/videos"),
      "@ui": path.resolve(__dirname, "../../src/components/ui"),
    },
    fallback: {
      path: require.resolve("path-browserify"),
      fs: false,
      crypto: false,
      stream: false,
      util: false,
      assert: false,
      http: false,
      url: false,
      buffer: false,
      os: false,
    },
  },
};
