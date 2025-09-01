// webpack/prod/staticRoutes-blog.js
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import blogData from "../../src/core/Blogs/Templates/LocalSEO/database_content.json" with { type: "json" };
import businessData from "../../Local-SEO-Generator/business-data.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base routes
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
  "/blog",
];

// Rich Snippets Generation Functions
function findNearestLocation(blog, businessConfig) {
  const business = businessConfig["nash-and-smashed"];
  // Try to match both city and state
  return (
    business.locations.find(
      loc =>
        loc.city &&
        loc.state &&
        blog.city &&
        blog.state &&
        loc.city.toLowerCase() === blog.city.toLowerCase() &&
        loc.state.toLowerCase() === blog.state.toLowerCase()
    ) ||
    // Fallback: match city only
    business.locations.find(
      loc =>
        loc.city &&
        blog.city &&
        loc.city.toLowerCase() === blog.city.toLowerCase()
    ) ||
    // Fallback: first location
    business.locations[0]
  );
}

function generateAddressSchema(location) {
  return {
    "@type": "PostalAddress",
    "streetAddress": location.address,
    "addressLocality": location.city,
    "addressRegion": location.state,
    "postalCode": location.zipCode,
    "addressCountry": location.country
  };
}

function generatePublisherSchema(businessConfig) {
  const business = businessConfig["nash-and-smashed"];
  return {
    "@type": "Organization",
    "name": business.business_name,
    "url": `https://${business.base_url}`,
    "logo": {
      "@type": "ImageObject",
      "url": `https://${business.base_url}/images/logo.png`
    }
  };
}

function generateHoursSchema(hours) {
  if (!hours) return [];
  
  return Object.entries(hours).map(([day, time]) => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
    "opens": time.split(' - ')[0],
    "closes": time.split(' - ')[1]
  }));
}

function generateRichSnippets(blog, businessConfig) {
  const business = businessConfig["nash-and-smashed"];
const nearestLocation = findNearestLocation(blog, businessConfig);  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": blog.title,
        "description": blog.metaDescription,
        "datePublished": blog.created_at,
        "dateModified": blog.updated_at,
        "author": { 
          "@type": "Organization", 
          "name": business.business_name 
        },
        "publisher": generatePublisherSchema(businessConfig),
        "mainEntityOfPage": `https://${business.base_url}/${blog.seo_friendly_url}`,
        "image": `https://${business.base_url}/images/blog/${blog.keyword.replace(/\s+/g, '-')}.jpg`
      },
      {
        "@type": "LocalBusiness",
        "name": business.business_name,
        "address": generateAddressSchema(nearestLocation),
        "telephone": nearestLocation.phone,
        "openingHours": generateHoursSchema(nearestLocation.hours),
        "servesCuisine": business.specialties,
        "priceRange": "$$",
        "url": `https://${business.base_url}`,
        "description": business.description
      }
    ]
  };
}

// Generate blog routes with rich snippets
const blogRoutes = blogData
  .filter((blog) => blog.url && blog.title)
  .map((blog) => {
    const richSnippets = generateRichSnippets(blog, businessData);
    return {
      route: `/${blog.url}`,
      blog: blog,
      richSnippets: richSnippets
    };
  });

export const routes = [...baseRoutes, ...blogRoutes.map(b => b.route)];

console.log(
  `📝 Generating ${routes.length} static routes (${blogRoutes.length} blog posts with rich snippets)`
);

// Helper function to convert route path to template name
function routeToTemplateName(route) {
  if (route === "/") return "index";
  return route.substring(1).replace(/\//g, "-");
}

// Enhanced template generation with rich snippets
function createBlogTemplate(blogRoute) {
  const { blog, richSnippets } = blogRoute;
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${blog.title}</title>
  <meta name="description" content="${blog.metaDescription}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://nashandsmashed.com/${blog.url}">
  <meta property="og:title" content="${blog.title}">
  <meta property="og:description" content="${blog.metaDescription}">
  <meta property="og:image" content="https://nashandsmashed.com/images/blog/${blog.keyword.replace(/\s+/g, '-')}.jpg">
  <meta property="og:site_name" content="Nash & Smashed">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://nashandsmashed.com/${blog.url}">
  <meta property="twitter:title" content="${blog.title}">
  <meta property="twitter:description" content="${blog.metaDescription}">
  <meta property="twitter:image" content="https://nashandsmashed.com/images/blog/${blog.keyword.replace(/\s+/g, '-')}.jpg">
  
  <!-- Canonical Link -->
  <link rel="canonical" href="https://nashandsmashed.com/${blog.url}">
  
  <!-- Rich Snippets -->
  <script type="application/ld+json">
${JSON.stringify(richSnippets, null, 2)}
  </script>
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
}

export function generateStaticRoutes() {
  return routes.map((route) => {
    // Check if this is a blog route
    const blogRoute = blogRoutes.find(b => b.route === route);
    
    if (blogRoute) {
      // Generate custom HTML template with rich snippets
      const blogTemplate = createBlogTemplate(blogRoute);
      const filename = `${route.substring(1)}/index.html`;
      
      return {
        templateContent: blogTemplate,
        filename,
        inject: true,
        minify: {
          collapseWhitespace: true,
          removeComments: false, // Keep JSON-LD
          removeRedundantAttributes: true,
          minifyCSS: true,
          minifyJS: true,
        },
      };
    } else {
      // Use existing template logic for non-blog routes
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
    }
  });
}

export function generateStaticHtmlPlugins() {
  return generateStaticRoutes().map((routeConfig) => {
    if (routeConfig.templateContent) {
      // For blog routes with custom templates
      return new HtmlWebpackPlugin({
        templateContent: routeConfig.templateContent,
        filename: routeConfig.filename,
        inject: routeConfig.inject,
        minify: routeConfig.minify,
      });
    } else {
      // For regular routes with file templates
      return new HtmlWebpackPlugin(routeConfig);
    }
  });
}