// Remove these Node.js imports - they're not needed in browser context
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

export const pageMetadata = {
  "/": {
    title: "Nash & Smashed - Gourmet Burgers & Drinks",
    description:
      "Experience the best gourmet burgers and craft cocktails at Nash & Smashed. Visit our locations or learn about franchise opportunities.",
    keywords:
      "nashville hot chicken, burgers, cocktails, restaurant, gourmet food",
  },
  "/locations": {
    title: "Our Locations | Nash & Smashed",
    description:
      "Find a Nash & Smashed location near you. Enjoy our signature burgers and cocktails at convenient locations across the country.",
    keywords:
      "nash and smashed locations, restaurant locations, burgers near me",
  },
  "/franchise": {
    title: "Franchise Opportunities | Nash & Smashed",
    description:
      "Start your own Nash & Smashed franchise. Learn about investment opportunities and how to bring our signature dining experience to your community.",
    keywords:
      "nash and smashed franchise, restaurant franchise, business opportunity",
  },
  "/contact": {
    title: "Contact Us | Nash & Smashed",
    description:
      "Get in touch with Nash & Smashed. Contact our team for inquiries, feedback, or to learn more about our restaurants.",
    keywords: "contact nash and smashed, restaurant contact, customer service",
  },
  "/calories": {
    title: "Nutritional Information | Nash & Smashed",
    description:
      "View the nutritional information and calorie content for Nash & Smashed menu items. Make informed choices about your dining experience.",
    keywords: "nash and smashed nutrition, calorie information, menu nutrition",
  },
  "/careers": {
    title: "Join Our Team | Nash & Smashed",
    description:
      "Explore career opportunities at Nash & Smashed. Join our team of passionate food and beverage professionals.",
    keywords: "nash and smashed careers, restaurant jobs, food service careers",
  },
  "/terms-of-service": {
    title: "Terms of Service | Nash & Smashed",
    description:
      "Nash & Smashed terms of service and legal information. Read our policies regarding site usage and services.",
    keywords: "terms of service, legal information, website terms",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Nash & Smashed",
    description:
      "Review Nash & Smashed's privacy policy. Learn how we collect, use, and protect your personal information.",
    keywords: "privacy policy, data protection, personal information",
  },
  "/locations/uk/chelmsford": {
    title:
      "Nash & Smashed Chelmsford | Authentic Nashville Hot Chicken in Essex",
    description:
      "Visit Nash & Smashed in Chelmsford, Essex - our first UK location serving authentic Nashville Hot Chicken and smash burgers.",
    keywords:
      "nash and smashed chelmsford, nashville hot chicken essex, burgers chelmsford",
  },
  "/blog": {
    title: "Blog | Nash & Smashed",
    description:
      "Read the latest news, recipes, and stories from Nash & Smashed. Discover Nashville Hot Chicken and smashed burger tips from our culinary team.",
    keywords:
      "nash and smashed blog, restaurant news, nashville hot chicken recipes",
  },
};

export function getPageMetadata(route) {
  // For blog posts, try to get metadata from imported blog data
  if (route.startsWith("/") && route !== "/blog" && !pageMetadata[route]) {
    try {
      // In browser context, we'll rely on the blog data being available through other means
      // This will be handled by the static generation process
      const defaultBlogMeta = {
        title: `${route.replace("/", "").replace(/-/g, " ")} | Nash & Smashed`,
        description: `Read more about Nashville Hot Chicken and our delicious menu items at Nash & Smashed.`,
        keywords: "nashville hot chicken, nash and smashed",
      };

      return defaultBlogMeta;
    } catch (error) {
      console.warn(`Could not find blog metadata for route: ${route}`);
    }
  }

  return (
    pageMetadata[route] || {
      title: "Nash & Smashed - Nashville Hot Chicken & Smash Burgers",
      description:
        "Experience authentic Nashville Hot Chicken and gourmet smash burgers at Nash & Smashed.",
      keywords: "nashville hot chicken, smash burgers, nash and smashed",
    }
  );
}
