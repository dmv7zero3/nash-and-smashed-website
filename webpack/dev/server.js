// webpack/dev/server.js
export const devServerConfig = {
  port: 8080,
  hot: true,
  open: true,
  historyApiFallback: true,
  static: [
    {
      directory: "./public",
      publicPath: "/",
    },
  ],
  compress: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  },
  client: {
    overlay: {
      errors: true,
      warnings: false,
    },
  },
  devMiddleware: {
    writeToDisk: false,
  },
};
