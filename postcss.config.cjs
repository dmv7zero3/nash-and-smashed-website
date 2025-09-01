module.exports = {
  plugins: {
    // Enable CSS nesting support
    "tailwindcss/nesting": {},

    // Tailwind CSS
    tailwindcss: {},

    // Auto-prefix for browser compatibility
    autoprefixer: {
      // Target browsers (can also be defined in browserslist)
      overrideBrowserslist: [
        "> 1%",
        "last 2 versions",
        "Firefox ESR",
        "not ie <= 8",
      ],
      // Disable CSS Grid prefixing to avoid warnings
      grid: false,
      // Remove outdated prefixes
      remove: true,
    },

    // Production optimizations
    ...(process.env.NODE_ENV === "production" && {
      // Remove unused CSS (PurgeCSS alternative)
      "@fullhuman/postcss-purgecss": {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
          "./public/**/*.html",
          "./webpack/templates/**/*.html",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        // Safelist important classes
        safelist: {
          standard: [
            // Keep dynamic classes
            /^(bg|text|border|hover|focus|active|disabled|sm|md|lg|xl|2xl):/,
            // Keep important utility classes
            /^(grid|flex|block|inline|hidden|visible)/,
            // Keep animation classes
            /^(animate|transition|transform|duration|ease)/,
          ],
          deep: [
            // Keep classes with modifiers
            /^(hover|focus|active|disabled):/,
          ],
          greedy: [
            // Keep classes that might be added dynamically
            /^(.*-enter|.*-leave)/,
          ],
        },
      },

      // Optimize CSS output
      cssnano: {
        preset: [
          "default",
          {
            // Preserve important comments
            discardComments: {
              removeAll: true,
            },
            // Normalize whitespace
            normalizeWhitespace: true,
            // Merge rules
            mergeRules: true,
            // Optimize calc() expressions
            calc: true,
            // Convert colors to shortest form
            colormin: true,
          },
        ],
      },
    }),
  },
};
