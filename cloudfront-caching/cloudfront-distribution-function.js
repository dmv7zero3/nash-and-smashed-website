/**
 * CloudFront Function for Nash & Smashed fully static website
 *
 * Handles:
 * 1. Static file pass-through (including XML, fonts, etc.)
 * 2. Static routes to their respective HTML files
 * 3. Known valid blog post patterns based on sitemap data
 * 4. Fallback to /index.html for React Router to handle unknown routes
 */

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Redirect /index.html to /
  if (uri === "/index.html") {
    return {
      statusCode: 301,
      statusDescription: "Moved Permanently",
      headers: {
        location: { value: "/" },
      },
    };
  }

  // Static file extensions
  var staticExtensions = [
    ".js",
    ".css",
    ".html",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".webp",
    ".ico",
    ".pdf",
    ".txt",
    ".woff",
    ".woff2",
    ".ttf",
    ".eot",
    ".mp4",
    ".map",
    ".json",
    ".xml",
    ".webmanifest",
  ];

  // Known static routes
  var staticRoutes = [
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

  // Valid blog post URL prefixes from sitemap
  // These are the actual blog categories that exist
  var validBlogPrefixes = [
    "/best-chicken-wings/",
    "/best-fried-chicken/",
    "/best-nashville-sandwiches/",
    "/best-smashed-burgers/",
    "/best-chicken-tenders/",
    "/craft-mocktails/",
    "/family-friendly-restaurant/",
    "/fast-food/",
    "/finger-licking-fried-chicken/",
    "/gourmet-burgers-restaurant/",
    "/best-halal-restaurant/",
    "/halal-burgers/",
    "/halal-fried-chicken/",
    "/halal-american-restaurant/",
    "/halal-desi-restaurant/",
    "/best-in-town-fried-chicken-burgers/",
    "/dine-in-takeout-restaurant/",
    "/open-till-late/",
    "/quick-bites/",
    "/best-milk-shakes/",
    "/best-waffles-in-town/",
  ];

  // 1. Pass through static files directly
  var lowerUri = uri.toLowerCase();
  for (var k = 0; k < staticExtensions.length; k++) {
    if (lowerUri.endsWith(staticExtensions[k])) {
      return request;
    }
  }

  // 2. Special handling for sitemap.xml and robots.txt
  if (uri === "/sitemap.xml" || uri === "/robots.txt") {
    return request;
  }

  // 3. Normalize URI (remove trailing slash, except for root)
  var cleanUri = uri === "/" ? "/" : uri.replace(/\/+$/, "");

  // 4. Handle static routes
  for (var i = 0; i < staticRoutes.length; i++) {
    if (cleanUri === staticRoutes[i]) {
      request.uri = cleanUri === "/" ? "/index.html" : cleanUri + "/index.html";
      return request;
    }
  }

  // 5. Check if this is a valid blog post URL
  // Only treat it as a blog post if it matches one of our known patterns
  var isBlogPost = false;
  for (var j = 0; j < validBlogPrefixes.length; j++) {
    if (cleanUri.startsWith(validBlogPrefixes[j])) {
      // Additional validation: ensure it has a location suffix
      var suffix = cleanUri.substring(validBlogPrefixes[j].length);
      // Match location patterns like "manassas-va", "district-heights-md", etc.
      if (
        /^[a-z\-]+-[a-z]{2}$/.test(suffix) ||
        /^[a-z\-]+-[a-z]+$/.test(suffix)
      ) {
        isBlogPost = true;
        break;
      }
    }
  }

  // If it's a valid blog post pattern, try to serve its HTML
  if (isBlogPost) {
    request.uri = cleanUri + "/index.html";
    return request;
  }

  // 6. Fallback: serve main index.html for React Router to handle
  // This includes invalid blog URLs like /southern-food/fairfax-va
  request.uri = "/index.html";
  return request;
}
