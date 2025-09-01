//tailwind.config.js
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssForms from "@tailwindcss/forms";
import tailwindcssTypography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lightning-yellow": {
          50: "#fefceb", // Lightest shade
          100: "#fdf7d0",
          200: "#faeea1",
          300: "#f2e06c", // Light shade
          400: "#edc840", // Light medium shade
          500: "#e8b720", // New base color (#E8B720)
          600: "#d49a18", // Medium shade
          700: "#b37a16", // Medium dark shade
          800: "#8f5c17", // Dark shade
          900: "#774b18", // Very dark shade
          950: "#432a0c", // Darkest shade
          DEFAULT: "#e8b720", // New default color (#E8B720)
        },
        bronzetone: {
          50: "#f8fde9",
          100: "#effcc5",
          200: "#e4fa8e",
          300: "#daf64e",
          400: "#d6f11e",
          500: "#cfe111",
          600: "#c1c20c",
          700: "#9b900d",
          800: "#807113",
          900: "#6d5c16",
          950: "#4d3d0a",
          DEFAULT: "#4d3d0a",
        },
        "dark-olive-bark": {
          DEFAULT: "#4d3d0b",
        },
      },
      fontFamily: {
        "open-sans": ['"open-sans"', '"open-sans-static"', "sans-serif"],
        "cosmic-lager": ['"Cosmic Lager"', "sans-serif"],
        copyduck: ['"Copyduck"', "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssForms, tailwindcssTypography],
};
