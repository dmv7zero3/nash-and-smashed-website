// webpack/prod/staticRoutes.js
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base routes only, no blogs
const baseRoutes = [
  "/",
  "/locations",
  "/franchise",
  "/contact",
  "/calories",
  "/careers",
  "/terms-of-service",
  "/privacy-policy",
  "/locations/uk/chelmsford",
];

// Helper function to convert route path to template name
function routeToTemplateName(route) {
  if (route === "/") return "index";
  return route.substring(1).replace(/\//g, "-");
}

export const routes = [...baseRoutes];

console.log(`📝 Generating ${routes.length} static routes (no blog posts)`);

export function generateStaticRoutes() {
  return routes.map((route) => {
    const templateName = routeToTemplateName(route);
    const templatePath = path.resolve(
      __dirname,
      `../templates/${templateName}.html`
    );

    const templateExists = fs.existsSync(templatePath);
    const finalTemplatePath = templateExists
      ? templatePath
      : path.resolve(__dirname, "../templates/index.html");

    const filename =
      route === "/" ? "index.html" : `${route.substring(1)}/index.html`;

    return {
      template: finalTemplatePath,
      filename,
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      },
    };
  });
}

export function generateStaticHtmlPlugins() {
  return generateStaticRoutes().map((routeConfig) => {
    return new HtmlWebpackPlugin(routeConfig);
  });
}
