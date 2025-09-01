// webpack/common/optimization.js
export const commonOptimization = {
  runtimeChunk: "single",
  moduleIds: "deterministic",
  chunkIds: "deterministic",
};

export const prodOptimization = {
  ...commonOptimization,
  minimize: true,

  // Simplified splitChunks
  splitChunks: {
    chunks: "all",
    maxInitialRequests: 6,
    minSize: 30000,
    // Remove maxSize limit that might interfere with source maps
    // maxSize: 250000,

    cacheGroups: {
      // React vendor bundle
      react: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: "vendor.react",
        chunks: "all",
        priority: 50,
        enforce: true,
      },

      // Router bundle
      router: {
        test: /[\\/]node_modules[\\/](react-router|@reach\/router)[\\/]/,
        name: "vendor.router",
        chunks: "all",
        priority: 45,
        enforce: true,
      },

      // Common vendor
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor.common",
        chunks: "all",
        priority: 20,
        minChunks: 1,
        maxSize: 200000,
      },

      // App code
      common: {
        name: "common",
        minChunks: 2,
        chunks: "all",
        priority: 10,
        enforce: true,
        maxSize: 150000,
      },
    },
  },

  usedExports: true,
  sideEffects: false,
  concatenateModules: true,

  // POTENTIAL FIX: Ensure minimizer doesn't skip source maps for large files
  minimizer: [
    `...`, // Use default minimizers
    // This ensures TerserPlugin includes source maps for all files
  ],
};

export const devOptimization = {
  ...commonOptimization,
  minimize: false,
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all",
      },
    },
  },
};
